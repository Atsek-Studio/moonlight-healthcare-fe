import { Suspense, lazy } from 'react';
import { PublicSite } from './App';
import { ContentProvider } from './content/ContentProvider';
const AdminApp = lazy(() => import('./admin/AdminApp'));
export default function Root() {
  const admin = window.location.pathname === '/admin' || window.location.pathname.startsWith('/admin/');
  return <ContentProvider>{admin ? <Suspense fallback={<p role="status">Loading content studio…</p>}><AdminApp /></Suspense> : <PublicSite />}</ContentProvider>;
}
