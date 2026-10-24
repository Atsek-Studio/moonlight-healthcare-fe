import { useState } from 'react';
export function AdminLogin({
  auth
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError('');
    const form = new FormData(event.currentTarget);
    try {
      await auth.signIn(form.get('email'), form.get('password'));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  return <div className="cms cms-login"><div className="cms-login-brand"><span className="cms-mark">✳</span><span>An Nhiên <small>CONTENT STUDIO</small></span></div>
    <div className="cms-login-card"><p className="cms-kicker">A little care, behind the scenes</p><h1>Welcome to your<br />content studio.</h1>
      <p className="cms-muted">Keep your clinic’s stories, services, and people up to date.</p>
      {auth.loading ? <p role="status">Checking your session…</p> : auth.isSupabaseConfigured ? auth.session ? <><p role="alert" className="cms-alert">{auth.error || 'Your account is not authorized.'}</p><button className="cms-button" onClick={() => auth.signOut().catch(err => setError(err.message))}>Sign out</button></> : <form onSubmit={submit}>
        <label className="cms-field">Email address<input type="email" name="email" autoComplete="username" required placeholder="you@clinic.com" /></label>
        <label className="cms-field">Password<input type="password" name="password" autoComplete="current-password" required /></label>
        {(error || auth.error) && <p role="alert" className="cms-alert">{error || auth.error}</p>}
        <button className="cms-button cms-primary" disabled={busy}>{busy ? 'Signing in…' : 'Sign in →'}</button>
        <p className="cms-small">Access is limited to staff approved by the project owner.</p>
      </form> : <div className="cms-setup-note"><h2>{auth.isLocalEditor ? 'Try the local editor' : 'Connect Supabase to continue'}</h2>
        <p>{auth.isLocalEditor ? 'Supabase is not connected yet. Explore the editor and publish changes to this browser only. No account is required in development mode.' : 'Staff sign-in is available after you configure Supabase. The local editor is disabled in production.'}</p>
        {auth.isLocalEditor && <button className="cms-button cms-primary" onClick={auth.enterLocal}>Open local editor →</button>}
        <p className="cms-small">Follow <code>supabase/SETUP.md</code> in the project to connect your database.</p>
      </div>}
      <a className="cms-back" href="/">← Back to the website</a>
    </div><div className="cms-login-footer">Thoughtful care starts with clear information.</div></div>;
}
