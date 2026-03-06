export interface IncidentNews {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    severity: 'Fatal' | 'Major' | 'Significant';
    description: string;
    casualties: number;
    rootCause: string;
    actionTaken: string;
    videoUrl?: string;
    imageUrl?: string;
    tags: string[];
    category: 'Recent' | 'Historical';
}

export const mockNews: IncidentNews[] = [
    // --- RECENT INCIDENTS (2024) ---
    {
        id: 'news-2024-1',
        title: 'Girder Alignment Shift: Urban Flyover',
        date: '2024-05-12',
        time: '14:20 IST',
        location: 'Lucknow, Uttar Pradesh',
        severity: 'Significant',
        description: 'During peak construction on the outer ring road, a pre-cast girder shifted by 15cm due to temporary support failure. Site was immediately evacuated. No casualties, but structural realignment required.',
        casualties: 0,
        rootCause: 'Temporary Support Instability',
        actionTaken: 'Nodal safety audit initiated. NHAI blacklisted the subcontractor for 6 months. Girder successfully reset with reinforced hydraulic jacks.',
        tags: ['Active Monitoring', 'Construction Safety', 'NHAI'],
        category: 'Recent'
    },
    {
        id: 'news-2024-2',
        title: 'Severe Subsidence: NH-58 Hill Stretch',
        date: '2024-04-28',
        time: '03:45 IST',
        location: 'Joshimath-Badrinath Road, Uttarakhand',
        severity: 'Major',
        description: 'A 50-meter stretch of the highway subsided following unseasonal cloudbursts. Ground-penetrating radar shows significant hollow cavities below the pavement crust.',
        casualties: 0,
        rootCause: 'Geological Instability / Drainage Failure',
        actionTaken: 'Stretch closed for heavy vehicles. Emergency GPR scanning completed. Restoration using geo-grids and controlled concrete injection planned.',
        tags: ['Himalayan Stretch', 'Monsoon Alert', 'NHIDCL'],
        category: 'Recent'
    },
    {
        id: 'news-2024-3',
        title: 'Expansion Joint Separation: Smart City Flyover',
        date: '2024-06-01',
        time: '11:10 IST',
        location: 'Pune, Maharashtra',
        severity: 'Significant',
        description: 'Commuters reported a 4-inch gap at a critical expansion joint on the newly inaugurated metro-link flyover. Investigation suggests thermal stress beyond design parameters.',
        casualties: 0,
        rootCause: 'Thermal Stress Fatigue',
        actionTaken: 'Speed limits reduced to 20kmph. Modular joint replacement scheduled for night hours to minimize urban disruption.',
        tags: ['Smart City', 'Urban Infra', 'Active Alert'],
        category: 'Recent'
    },

    // --- HISTORICAL INCIDENTS (Previous) ---
    {
        id: 'news-1',
        title: 'Morbi Suspension Bridge Catastrophe',
        date: '2022-10-30',
        time: '18:30 IST',
        location: 'Morbi, Gujarat',
        severity: 'Fatal',
        description: 'The century-old suspension bridge collapsed into the Machchhu river just days after reopening. Excessive crowd loading combined with rusted cable segments led to a snap failure.',
        casualties: 141,
        rootCause: 'Corrosion & Overloading',
        actionTaken: 'SIT investigation launched. Operators arrested for negligence. Nationwide safety audit mandated for all colonial-era suspension bridges.',
        videoUrl: 'https://youtu.be/YsAhdG_6ZsE?si=t2Jg5xVSWMR8iGjo',
        tags: ['Bridge Failure', 'Heritage Infra', 'Maintenance Neglect'],
        category: 'Historical'
    },
    {
        id: 'news-2',
        title: 'Mumbai "Himalaya" Foot Overbridge Collapse',
        date: '2019-03-14',
        location: 'CST Station, Mumbai',
        time: '19:35 IST',
        severity: 'Fatal',
        description: 'A major portion of the foot-overbridge connecting CSMT station collapsed during evening peak hours. Audit reports later identified "severe corrosion" that was missed in visual inspections.',
        casualties: 6,
        rootCause: 'Internal Corrosion',
        actionTaken: 'BMC auditors suspended. Forensic structural audit of all Mumbai FOBs initiated. New design with stainless steel girders commissioned.',
        tags: ['Urban Transit', 'Mumbai', 'Audit Failure'],
        category: 'Historical'
    },
    {
        id: 'news-3',
        title: 'Majerhat Bridge Structural Failure',
        date: '2018-09-04',
        time: '16:40 IST',
        location: 'Kolkata, West Bengal',
        severity: 'Major',
        description: 'A 40-year-old section of the Majerhat bridge collapsed onto railway tracks. The primary cause was identified as lack of bituminous layer stripping, leading to excessive dead load over decades.',
        casualties: 3,
        rootCause: 'Excessive Dead Load',
        actionTaken: 'Entire bridge demolished. New 4-lane cable-stayed bridge constructed with smart sensor arrays.',
        tags: ['Kolkata', 'Bridge', 'Load Mismanagement'],
        category: 'Historical'
    },
    {
        id: 'news-4',
        title: 'Silkyara Tunnel Collapse Incident',
        date: '2023-11-12',
        time: '05:30 IST',
        location: 'Uttarkashi, Uttarakhand',
        severity: 'Major',
        description: 'A section of the tunnel on the Char Dham All-Weather Road collapsed, trapping 41 workers. The incident highlighted the risks of tunneling in fragile Himalayan geology.',
        casualties: 0,
        rootCause: 'Geological Shear',
        actionTaken: '41 workers rescued after 17 days using "Rat-Hole" miners. Tunnel design revised to include emergency escape shafts every 500 meters.',
        videoUrl: 'https://youtu.be/PWhBGqa09-Y?si=Yzd3f5sBiYDuaT8Q',
        tags: ['Himalayan Infra', 'Tunneling', 'Construction Safety'],
        category: 'Historical'
    },
    {
        id: 'news-5',
        title: 'Andheri Gokhale Bridge Partial Collapse',
        date: '2018-07-03',
        time: '07:30 IST',
        location: 'Andheri, Mumbai',
        severity: 'Significant',
        description: 'Heavy rains led to the collapse of a pathway section of the Gokhale bridge. Saline corrosion of the cantilevered steel parts was cited as the trigger.',
        casualties: 2,
        rootCause: 'Saline Corrosion',
        actionTaken: 'Railways and BMC coordinated a complete bridge overhaul. Advanced cathodic protection applied to all exposed steel elements.',
        tags: ['Monsoon Impact', 'Corrosion', 'Rail Overbridge'],
        category: 'Historical'
    },
    {
        id: 'news-6',
        title: 'Kota Chambal Bridge Gantry Collapse',
        date: '2009-12-24',
        time: '17:20 IST',
        location: 'Kota, Rajasthan',
        severity: 'Fatal',
        description: 'During construction of the cable-stayed bridge, a massive gantry collapsed into the Chambal river. Engineering lapses in the temporary support structures were found.',
        casualties: 48,
        rootCause: 'Engineering Design Lapse',
        actionTaken: 'Detailed forensic inquiry by IIT Bombay. Project restarted with international safety consultants. Completed in 2017.',
        tags: ['Construction Failure', 'Cable Stayed', 'Rajasthan'],
        category: 'Historical'
    }
];