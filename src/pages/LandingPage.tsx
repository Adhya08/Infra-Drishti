import React from 'react';
import { MapComponent } from '../components/MapComponent';
import { mockAssets } from '../data/mockAssets';
import { Logo } from '../components/Logo';
import { ChevronRight, ArrowRight, Mountain, ShieldCheck, Globe } from 'lucide-react';

interface LandingPageProps {
    onExplore: () => void;
    onHowItWorks: () => void;
    isDarkMode?: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onExplore, onHowItWorks, isDarkMode = false }) => {
    // Select a few representative assets for the primary showcase
    const primaryAssets = mockAssets.filter(a => [
        'del-1', 'samruddhi-1', 'agra-luc-1', 'mthl-1', 'signature-1', 'dwarka-exp-1'
    ].includes(a.id));

    // Expanded gallery for "Strategic Assets"
    const strategicAssets = mockAssets.filter(a => [
        'chenab-1', 'pamban-1', 'mum-1', 'neh-1', 'bogibeel-1', 'mgsetu-1'
    ].includes(a.id));

    const roadAssetsCount = mockAssets.filter(a => a.type === 'Road').length;
    const bridgeAssetsCount = mockAssets.filter(a => a.type === 'Bridge' || a.type === 'Flyover').length;
    const avgRiskScore = Math.round(mockAssets.reduce((acc, a) => acc + a.riskScore, 0) / mockAssets.length);

    return (
        <div className="relative isolate overflow-hidden dark:bg-slate-950 transition-colors duration-300">
            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
                    <div className="flex">
                        <div className="relative flex items-center gap-x-4 rounded-full px-4 py-1 text-sm leading-6 text-slate-600 dark:text-slate-400 ring-1 ring-slate-900/10 dark:ring-slate-100/10 hover:ring-slate-900/20 dark:hover:ring-slate-100/20">
                            <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                <Logo size={16} /> Smart Cities & Strategic Infra India
                            </span>
                            <span className="h-4 w-px bg-slate-900/10 dark:bg-slate-100/10" aria-hidden="true" />
                            <span className="flex items-center gap-x-1">
                                INFRA-DRISHTI v2.5
                                <ChevronRight className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                            </span>
                        </div>
                    </div>
                    <h1 className="mt-10 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl uppercase leading-tight">
                        INFRA-DRISHTI: <br />
                        <span className="text-slate-500 dark:text-slate-400 lowercase italic">Vision for a Safer Bharat.</span>
                    </h1>