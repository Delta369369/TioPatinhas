import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Header, Footer } from './components/UI';
import { metadata } from './utils/metadata';
import Home from './pages/Home';
import ServicePage, { NotFound } from './pages/ServicePage';
import Institutional from './pages/Institutional';
function NavigationEffects(){const {pathname,hash}=useLocation();useEffect(()=>{const m=metadata(pathname);document.title=m.title;document.querySelector('meta[name="description"]')?.setAttribute('content',m.description);for(const [key,value] of [['og:title',m.title],['og:description',m.description]])document.querySelector(`meta[property="${key}"]`)?.setAttribute('content',value);if(hash){requestAnimationFrame(()=>document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView())}else{window.scrollTo(0,0);document.getElementById('main')?.focus({preventScroll:true})}},[pathname,hash]);return null}
export default function App(){return <><a className="skip-link" href="#main">Pular para o conteúdo</a><NavigationEffects/><Header/><main id="main" tabIndex={-1}><Routes><Route path="/" element={<Home/>}/><Route path="/servicos/:slug/" element={<ServicePage/>}/>{['sobre','privacidade','termos'].map(page=><Route key={page} path={`/${page}/`} element={<Institutional page={page}/>}/>)}<Route path="*" element={<NotFound/>}/></Routes></main><Footer/></>}
