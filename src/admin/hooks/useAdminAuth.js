import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured, isLocalEditor } from '../../lib/supabase';
export function useAdminAuth() {
  const [session, setSession] = useState(null);
  const [localAccess, setLocalAccess] = useState(false);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    if (!supabase) return;
    let active = true;
    supabase.auth.getSession().then(({
      data,
      error
    }) => {
      if (!active) return;
      if (error) {
        setError(error.message);
        setLoading(false);
      } else {
        setSession(data.session);
        if (!data.session) setLoading(false);
      }
    });
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange((_event, value) => {
      if (active) {
        setSession(value);
        if (!value) {
          setAuthorized(false);
          setLoading(false);
        }
      }
    });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);
  const userId = session?.user?.id;
  useEffect(() => {
    if (!userId) return;
    let active = true;
    setLoading(true);
    setAuthorized(false);
    supabase.from('cms_admins').select('user_id').eq('user_id', userId).maybeSingle().then(({
      data,
      error
    }) => {
      if (active) {
        setAuthorized(Boolean(data) && !error);
        setError(error ? error.message : !data ? 'This account does not have content editor access. Ask the project owner to add it to cms_admins.' : '');
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [userId]);
  async function signIn(email, password) {
    setError('');
    const {
      error
    } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw new Error(error.message);
  }
  async function signOut() {
    if (isLocalEditor) {
      setLocalAccess(false);
      return;
    }
    const {
      error
    } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
    setAuthorized(false);
  }
  return {
    session,
    loading,
    authorized: isLocalEditor ? localAccess : authorized,
    error,
    signIn,
    signOut,
    enterLocal: () => setLocalAccess(true),
    isLocalEditor,
    isSupabaseConfigured
  };
}
