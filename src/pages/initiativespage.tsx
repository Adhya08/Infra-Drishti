import React from 'react';
import { CheckCircle2, Download, Handshake } from 'lucide-react';

const InitiativeCard: React.FC<{
  title: string;
  agency: string;
  status: 'Ongoing' | 'Upcoming' | 'Planned';
  description: string;
  milestones: string[];
  budget: string;
}> = ({ title, agency, status, description, milestones, budget }) => (
  <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm hover:shadow-md transition-all">
    <div className="flex justify-between items-start mb-6">
      <div>
        <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">{agency}</span>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">{title}</h3>
      </div>
      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${status === 'Ongoing' ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' :
        status === 'Upcoming' ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300' :
          'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-500'
        }`}>
        {status}
      </span>
    </div>
    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">{description}</p>
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs border-b border-slate-100 dark:border-slate-800 pb-2">
        <span className="text-slate-500 font-bold uppercase">Estimated Investment</span>
        <span className="text-slate-900 dark:text-white font-black">{budget}</span>
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Key Milestones</p>
        <ul className="space-y-2">
          {milestones.map((m, i) => (
            <li key={i} className="flex items-center text-xs text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-slate-900 dark:text-white" />
              {m}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export const InitiativesPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 dark:bg-slate-950 transition-colors">
      <div className="mb-16 text-center">
        <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase mb-4">Govt. Initiatives</h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
          Tracking the evolution of India's multi-modal infrastructure network. Digital oversight for a developed Bharat by 2047.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <InitiativeCard
          title="PM Gati Shakti Master Plan"
          agency="Logistics Division, DPIIT"
          status="Ongoing"
          description="A transformative approach for integrated and multi-modal connectivity, ensuring seamless movement of people, goods and services."
          milestones={["101 key projects identified", "Unified Logistics Interface Platform (ULIP) live", "Digital Master Plan mapping across 16 ministries"]}
          budget="₹100 Lakh Crore"
        />
        <InitiativeCard
          title="Bharatmala Pariyojana"
          agency="NHAI / MoRTH"
          status="Ongoing"
          description="Focused on optimizing efficiency of freight and passenger movement across India by bridging critical infrastructure gaps."
          milestones={["Phase I: 34,800 km road network", "22 Green Expressway Corridors", "Multi-Modal Logistics Parks (MMLPs)"]}
          budget="₹5.35 Lakh Crore"
        />
        <InitiativeCard
          title="Sagarmala Project"
          agency="Ministry of Ports & Shipping"
          status="Ongoing"
          description="Promoting port-led development in India through 14 Coastal Economic Zones and extensive road-rail last-mile connectivity."
          milestones={["New Pamban Bridge completion", "Vizhinjam Port Phase I", "800+ projects under implementation"]}
          budget="₹8.0 Lakh Crore"
        />
        <InitiativeCard
          title="Shinkun La Tunnel"
          agency="NHIDCL / BRO"
          status="Upcoming"
          description="Connecting Lahaul valley to Zanskar valley, it will be the world's highest tunnel at 15,800 ft, providing all-weather connectivity."
          milestones={["Tendering process started", "Strategic Defense access link", "Completion target 2026"]}
          budget="₹1,681 Crore"
        />
        <InitiativeCard
          title="National Air Quality Hub"
          agency="CPCB / Smart Cities"
          status="Planned"
          description="Deploying IoT sensors across National Highway tolls to monitor real-time vehicular emissions and structural impact of climate change."
          milestones={["Pilot phase in 10 metro cities", "AI-driven congestion rerouting", "Solar-powered sensor grids"]}
          budget="₹2,500 Crore"
        />
        <InitiativeCard
          title="India-Middle East-Europe Economic Corridor (IMEC)"
          agency="External Affairs / NHAI"
          status="Upcoming"
          description="A strategic railway and shipping link aiming to stimulate economic development through enhanced connectivity between Asia, Arabian Gulf, and Europe."
          milestones={["Inter-government MOU signed", "Survey of rail links in UAE/Saudi", "Digital trade corridor framework"]}
          budget="Strategic Partnership"
        />
      </div>

      <div className="mt-20 bg-slate-900 dark:bg-white rounded-[3rem] p-12 text-center text-white dark:text-slate-900 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Strategic Digital Twin Corridor</h2>
          <p className="max-w-2xl mx-auto opacity-90 leading-relaxed mb-8">
            INFRA-DRISHTI is working towards integrating the <strong>National Infrastructure Pipeline (NIP)</strong>
            real-time dataset to provide predictive health monitoring before projects even break ground.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Vision 2047 Report
            </button>
            <button className="bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 px-8 py-4 rounded-2xl font-bold hover:bg-slate-700 dark:hover:bg-slate-300 transition-all flex items-center gap-2">
              <Handshake className="w-4 h-4" />
              NHAI Data Partnership
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
      </div>
    </div>
  );
};
