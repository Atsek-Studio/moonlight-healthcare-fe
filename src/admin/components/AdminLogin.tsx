import { useState } from 'react';
export function AdminLogin({
  auth
}: {auth:ReturnType<typeof import('../hooks/useAdminAuth').useAdminAuth>}) {
  const [busy, setBusy] = useState(false),
    [error, setError] = useState(''),
    [showPassword, setShowPassword] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError('');
    const form = new FormData(event.currentTarget);
    try {
      await auth.signIn(String(form.get('email') || ''), String(form.get('password') || ''));
    } catch (err) {
      if (!(err instanceof Error)) throw err;
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  return <div className="cms cms-login"><div className="cms-login-brand"><span className="cms-mark">✳</span><span>An Nhiên<small>WEBSITE MANAGER</small></span></div><div className="cms-login-card"><p className="cms-kicker">A PLACE FOR YOUR CLINIC TEAM</p><h1>Welcome back.</h1><p className="cms-muted">Keep your clinic’s website up to date. No technical experience needed.</p>
    {auth.loading ? <p role="status">Checking your sign-in…</p> : auth.isSupabaseConfigured ? auth.session ? <><p role="alert" className="cms-alert">{auth.error || 'Please ask your website owner for editing access.'}</p><button className="cms-button" onClick={() => auth.signOut().catch(err => setError(err.message))}>Use another account</button>{error && <p role="alert">{error}</p>}</> : <form onSubmit={submit}><label className="cms-field">Your email<input type="email" name="email" autoComplete="username" required placeholder="you@yourclinic.com" /></label><label className="cms-field">Password<input type={showPassword ? 'text' : 'password'} name="password" autoComplete="current-password" required /></label><label className="cms-password-toggle"><input type="checkbox" checked={showPassword} onChange={event => setShowPassword(event.target.checked)} /> Show password</label>{(error || auth.error) && <p role="alert" className="cms-alert">{error || auth.error}</p>}<button className="cms-button cms-primary" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button><p className="cms-small">Need access? Please contact your website owner.</p></form> : <div className="cms-setup-note"><h2>{auth.isLocalEditor ? 'Try it safely' : 'Editing is not ready yet'}</h2><p>{auth.isLocalEditor ? 'Explore the website manager in practice mode. Changes will stay in this browser, so you can learn without changing the live website.' : 'Please ask your website owner to finish setting up staff access.'}</p>{auth.isLocalEditor && <button className="cms-button cms-primary" onClick={auth.enterLocal}>Try website manager →</button>}</div>}
    <a className="cms-back" href="/">← Back to your website</a></div><div className="cms-login-footer">Simple updates. A website that stays useful.</div></div>;
}
