local Divisions = {
  INMATES = {
    displayName = "INMATES",
    role = "Prison population / incarcerated players or NPCs",
    ranks = {
      "Newcomer","Inmate I","Inmate II","Worker","Laborer","Trusted Worker","Trustee","Senior Trustee","Enforcer","Senior Enforcer",
      "Cell Leader","Assistant Chief","Cell Chief","Ward Representative","Prison Veteran","Order Marshal","Reform Leader","Penal Elder","Legacy","Honorary"
    },
    visual = { color = "Gray", icon = "broken_chain" },
    notes = "Progression tied to behavior, tasks, or admin promotions."
  },

  CECOT_Guards = {
    displayName = "CECOT Guards",
    role = "Primary facility security: patrols, access control, incident response.",
    ranks = {
      "Guard Trainee","Guard I","Guard II","Guard III","Patrolman","Senior Patrolman","Corporal","Sergeant","Staff Sergeant","Platoon Sergeant",
      "Warrant Officer","Lieutenant","Senior Lieutenant","Captain","Major","Lieutenant Colonel","Colonel","Brigadier","Deputy Commander","Commander"
    },
    visual = { color = "Dark Blue", icon = "shield" },
    notes = "Authority inside facility and follows HQ directives."
  },

  CECOT_Internal = {
    displayName = "CECOT Internal Guards",
    role = "Secure inner perimeters and sensitive-area protection.",
    ranks = {
      "Internal Recruit","Internal Guard I","Internal Guard II","Specialist","Senior Specialist","Corporal","Sergeant","Senior Sergeant","Chief Sergeant","Junior Lieutenant",
      "Lieutenant","Senior Lieutenant","Captain","Senior Captain","Major","Security Major","Internal Commander","Deputy Internal Chief","Internal Chief","Internal Director"
    },
    visual = { color = "Navy", icon = "lock" },
    notes = "Requires higher clearance than general guards."
  },

  CECOT_External = {
    displayName = "CECOT External Guards",
    role = "Outer perimeter security, checkpoints, visitor control.",
    ranks = {
      "Gate Guard","Checkpoint Officer","Patrolman","Senior Patrolman","Corporal","Sergeant","Senior Sergeant","Shift Leader","Area Sergeant","Field Lieutenant",
      "Lieutenant","Senior Lieutenant","Captain","External Captain","Major","Sector Commander","External Commander","Deputy External Chief","External Chief","Perimeter Director"
    },
    visual = { color = "Olive Green", icon = "gate" },
    notes = "Focus on crowd control, access, and traffic procedures."
  },

  CECOT_HQ = {
    displayName = "CECOT Headquarters (HQ)",
    role = "Administrative command: intel, policy, clearances, coordination.",
    ranks = {
      "Clerk","Administrative Assistant","Records Officer","HQ Officer","Senior Officer","Staff Officer","Section Chief","Deputy Chief","Chief of Staff","Operations Director",
      "Senior Director","Department Head","Deputy Director","Director","Executive Director","Assistant Director","Policy Director","Strategic Director","Deputy Commissioner","Commissioner"
    },
    visual = { color = "White & Gold", icon = "building" },
    notes = "Issues policies, promotions, and security clearances."
  },

  RAB = {
    displayName = "Rapid Action Battalion (RAB)",
    role = "High-threat tactical response: counter-assaults and heavy incidents.",
    ranks = {
      "Operator","Breacher","Tactical Specialist","Entry Specialist","Point Man","Team Leader","Squad Sergeant","Squad Leader","Platoon Sergeant","Platoon Leader",
      "Operations NCO","Operations Officer","Field Commander","Tactical Commander","Senior Commander","Deputy Commander","Commander","Special Ops Director","Rapid Action Chief","RAB Commander"
    },
    visual = { color = "Black & Red", icon = "lightning" },
    notes = "Short-notice deployments with heavy gear and lethal options."
  },

  SWAT = {
    displayName = "SWAT",
    role = "Urban tactical operations: hostage rescue, barricades, precision entry.",
    ranks = {
      "Trainee Operator","Operator I","Operator II","Operator III","Breach Specialist","Entry Leader","Tactical NCO","Team Leader","Squad Leader","Tactical Sergeant",
      "Negotiator","Field Commander","Operations Officer","Tactical Commander","Senior Commander","Deputy Chief","SWAT Chief","SWAT Director","Urban Ops Chief","Special Response Commander"
    },
    visual = { color = "Black", icon = "crosshairs" },
    notes = "Specialized in breaching, negotiation support, and precision ops."
  },

  SSF = {
    displayName = "Specialized Security Forces (SSF)",
    role = "VIP protection, convoy security, and sensitive operations.",
    ranks = {
      "Operative","Protection Specialist","Convoy Specialist","Senior Operative","Team Leader","Protection Sergeant","Tactical Leader","Close Protection Officer","Advanced Protection Officer","Protection Chief",
      "Unit Leader","Senior Unit Leader","Unit Commander","Protection Director","Security Director","VIP Security Chief","Personal Security Officer","Executive Protection Chief","Security Commander","SSF Commander"
    },
    visual = { color = "Dark Teal", icon = "star_wing" },
    notes = "Cross-trained in medical response and evasive driving."
  },

  Congress = {
    displayName = "Congress",
    role = "Legislative body that writes and approves laws and oversight measures.",
    ranks = {
      "Representative","Junior Representative","Senior Representative","Deputy Speaker","Speaker","Committee Member","Committee Chair","Senior Chair","Caucus Leader","Whip",
      "Senior Whip","Parliamentary Secretary","Legislative Director","Policy Chair","Minority Leader","Majority Leader","Deputy Speaker Pro Tempore","Speaker Pro Tempore","Speaker of Congress","Congress President"
    },
    visual = { color = "Dark Maroon", icon = "gavel" },
    notes = "Approves major rule changes and can pass decrees."
  },

  Government = {
    displayName = "Government",
    role = "Elected/appointed authority: policy, lawmaking, and high-level governance.",
    ranks = {
      "Clerk","Assistant","Senior Assistant","Analyst","Senior Analyst","Advisor","Senior Advisor","Policy Officer","Deputy Director","Director",
      "Senior Director","Department Head","Deputy Minister","Minister","Senior Minister","Deputy Leader","Leader","Prime Minister","Head of State","Supreme Official"
    },
    visual = { color = "Purple", icon = "crown" },
    notes = "Sets laws and edicts impacting gameplay."
  },

  TDU = {
    displayName = "Training & Discipline Unit (TDU)",
    role = "Recruits training, certification, and discipline enforcement.",
    ranks = {
      "Trainee","Cadet Instructor","Instructor I","Instructor II","Senior Instructor","Drill Sergeant","Training Sergeant","Training Chief","Curriculum Lead","Assessor",
      "Certification Officer","Discipline NCO","Discipline Officer","Senior Discipline Officer","Training Director","Deputy Training Chief","Head Trainer","TDU Deputy Director","TDU Director","Head of Discipline"
    },
    visual = { color = "Orange", icon = "crossed_swords" },
    notes = "Runs onboarding, certifications, and promotion exams."
  },

  ARC = {
    displayName = "Anti-Raiders Corps (ARC)",
    role = "Defend against raiding parties; fortification and checkpoint defense.",
    ranks = {
      "Scout","Recon Specialist","Field Defender","Shieldman","Skirmisher","Defender","Tactical NCO","Squad Leader","Fortification Lead","Checkpoint Sergeant",
      "Sector Sergeant","Sector Lieutenant","Field Commander","Defense Officer","Defense Commander","Regional Commander","Senior Field Commander","Anti-Raid Chief","ARC Commander","ARC Director"
    },
    visual = { color = "Brown", icon = "shielded_spear" },
    notes = "Specializes in rapid fortification and counter-raid tactics."
  },

  Firearms_Unit = {
    displayName = "Firearms Unit",
    role = "Armory management, marksmanship training, and weapons maintenance.",
    ranks = {
      "Armory Apprentice","Armory Tech I","Armory Tech II","Armorer","Range Assistant","Range Instructor","Marksman","Senior Marksman","Ballistics Specialist","Weapons Technician",
      "Armory Sergeant","Armory Chief","Weapons Officer","Maintenance Lead","Certification Officer","Armory Supervisor","Armory Director","Head Armorer","Firearms Commander","Head of Firearms"
    },
    visual = { color = "Gunmetal Gray", icon = "target" },
    notes = "Controls weapon issuance and certifies users."
  },

  ATA = {
    displayName = "All-Time Arms Division (ATA)",
    role = "Advanced arms R&D and elite weapons specialists.",
    ranks = {
      "Weapons Cadet","Junior Designer","Designer","Senior Designer","Specialist","Senior Specialist","Field Tester","Lead Tester","Systems Engineer","Senior Engineer",
      "Prototype Lead","R&D Officer","Project Lead","Senior Project Lead","Arms Supervisor","Arms Manager","Arms Director","R&D Director","Arms Commander","Chief of Arms"
    },
    visual = { color = "Silver & Crimson", icon = "gear_bolt" },
    notes = "Access to prototype gear; requires high clearance."
  },

  Police_Department = {
    displayName = "Police Department",
    role = "Civil law enforcement, investigations, and public safety.",
    ranks = {
      "Cadet","Patrol Officer I","Patrol Officer II","Senior Officer","Corporal","Sergeant","Staff Sergeant","Sergeant First Class","Lieutenant","Senior Lieutenant",
      "Captain","Senior Captain","Major","Commander","Senior Commander","Deputy Chief","Chief Inspector","Assistant Chief","Deputy Chief of Police","Chief of Police"
    },
    visual = { color = "Royal Blue", icon = "badge" },
    notes = "Coordinates jurisdictional matters with CECOT."
  },

  AND = {
    displayName = "Anti-Nationalist Department (AND)",
    role = "Monitor and counter extremist ideologies; intel and counter-propaganda.",
    ranks = {
      "Analyst","Senior Analyst","Researcher","Field Investigator","Senior Investigator","Intel Officer","Senior Intel Officer","Policy Analyst","Policy Officer","Policy Director",
      "Counter-Propaganda Lead","Operations Officer","Field Commander","Deputy Chief","Chief Analyst","Department Officer","Department Director","Senior Department Director","Department Chief","Head of AND"
    },
    visual = { color = "Slate Gray", icon = "crossed_eye" },
    notes = "Handles sensitive surveillance and legal constraints."
  },

  COJ = {
    displayName = "Council of Judgment (COJ)",
    role = "Judicial body for major cases, high-profile penalties, and appeals.",
    ranks = {
      "Court Clerk","Court Officer","Legal Clerk","Adjudicator","Senior Adjudicator","Panel Member","Senior Panel Member","Judicial Officer","Associate Judge","Judge",
      "Senior Judge","Appeals Judge","High Judge","Council Member","Senior Councilor","Councilor","Deputy High Councilor","High Councilor","Chief Justice","Grand Councilor"
    },
    visual = { color = "Black & Silver", icon = "scales" },
    notes = "Determines sanctions and high-level disciplinary outcomes."
  },

  Leader_Judgment = {
    displayName = "Leader Judgment",
    role = "Tribunal specifically for leader-level misconduct and removals.",
    ranks = {
      "Investigator","Senior Investigator","Case Officer","Panel Member","Senior Panel Member","Hearing Officer","Deputy Judge","Judge","Senior Judge","Chief Judge",
      "Tribunal Member","Senior Tribunal Member","Tribunal Chair","Deputy Tribunal Chief","Tribunal Chief","Judgment Director","Leader Tribunal Chief","Judgment Overseer","Judgment High Chief","Judgment Supreme"
    },
    visual = { color = "Crimson", icon = "gavel_star" },
    notes = "Handles only the most senior leadership cases."
  },

  Leader_Officials = {
    displayName = "Leader Officials",
    role = "Top leadership e.g., presidents, governors, emergency authorities.",
    ranks = {
      "Official Aide","Senior Aide","Advisor","Senior Advisor","Deputy Minister","Minister","Senior Minister","Deputy Leader","Leader","Acting Leader",
      "Governor","Regional Governor","National Governor","Chief Executive","Deputy Executive","Executive","Deputy Leader General","Leader General","Supreme Leader","State Leader"
    },
    visual = { color = "Gold", icon = "laurel" },
    notes = "Holds highest-tier authority within the state structure."
  },

  Secret_Forces = {
    displayName = "Secret Forces",
    role = "Covert operations, deniable missions, and black-ops.",
    ranks = {
      "Asset","Field Agent","Covert Operative","Senior Operative","Specialist","Case Officer","Handler","Senior Handler","Cell Leader","Field Commander",
      "Operations Officer","Operations Chief","Deputy Director","Director","Shadow Director","Principal Operative","Black Ops Chief","Covert Commander","Secret Chief","Master of Shadows"
    },
    visual = { color = "Midnight Black", icon = "shadow" },
    notes = "Operates off-record with extreme secrecy; limited access."
  },

  Secret_24_25 = {
    displayName = "24/25 Secret Division",
    role = "Highly-classified cell activated for specific temporal or coded ops.",
    ranks = {
      "Initiate","Operative I","Operative II","Operative III","Field Operative","Senior Field Operative","Specialist","Senior Specialist","Cell Agent","Cell Leader",
      "Cell Commander","Regional Operative","Operations Lead","Division Officer","Division Chief","Deputy Chief","Director","Senior Director","Secret Division Chief","Grand Chief"
    },
    visual = { color = "Dark Indigo", icon = "sigil_24_25" },
    notes = "Activated rarely for high-impact story events."
  },

  TMF = {
    displayName = "Twice Mayday Forces (TMF)",
    role = "Emergency rapid-response unit with limited activation cycles.",
    ranks = {
      "Responder","Responder I","Responder II","Triage Specialist","Lead Responder","Response Sergeant","Response Leader","Field Coordinator","Crisis NCO","Crisis Officer",
      "Crisis Leader","Emergency Commander","Crisis Commander","Deputy Commander","TMF Director","Senior Director","Activation Chief","Response Chief","Mission Chief","TMF Commander"
    },
    visual = { color = "Neon Red", icon = "double_exclaim" },
    notes = "High activation cost and limited availability per crisis cycle."
  },

  Communication_Workers = {
    displayName = "Communication Workers",
    role = "Maintain comms infrastructure and secure channels.",
    ranks = {
      "Tech Assistant","Junior Technician","Network Technician","Senior Technician","Radio Specialist","Systems Technician","Comm Engineer","Senior Engineer","Network Lead","Encryption Specialist",
      "Comm Supervisor","Comm Manager","Operations Engineer","Systems Lead","Deputy Comm Chief","Comm Chief","Head of Networks","Head of Encryption","Head of Comms Operations","Chief Communications Officer"
    },
    visual = { color = "Cyan", icon = "antenna" },
    notes = "Controls radio nets, encryption, and secure channels."
  },

  Media_Press = {
    displayName = "Media & Press Department",
    role = "News, press releases, propaganda, and public relations.",
    ranks = {
      "Intern","Junior Reporter","Reporter","Senior Reporter","Investigative Reporter","Bureau Chief","Editor","Senior Editor","Section Editor","Managing Editor",
      "Content Director","PR Officer","Senior PR Officer","Press Manager","Deputy Press Director","Press Director","Media Director","Head of Media","Chief Press Officer","Director of Communications"
    },
    visual = { color = "Yellow", icon = "megaphone" },
    notes = "Can shape public narrative and issue official statements."
  },

  Gangsters = {
    displayName = "Gangsters",
    role = "Low-to-mid-level criminal crews focused on turf and small crimes.",
    ranks = {
      "Associate","Runner","Street Thug","Soldier","Veteran Soldier","Enforcer","Specialist","Lieutenant","Senior Lieutenant","Caporegime",
      "Crew Boss","Regional Boss","Underboss","Consigliere","Acting Don","Family Don","Crime Lord","Senior Crime Lord","Kingpin","Local Godfather"
    },
    visual = { color = "Brown & Black", icon = "mask" },
    notes = "Turf control, small-scale economy, and rivalry mechanics."
  },

  Mafia = {
    displayName = "Mafia",
    role = "Structured organized crime syndicate with contracts and influence.",
    ranks = {
      "Associate","Soldier","Veteran Soldier","Enforcer","Trusted Enforcer","Caporegime","Senior Capo","Lieutenant","Underboss","Consigliere",
      "Acting Don","Don","Regional Don","Family Don","Crime Councilor","Council Member","Senior Council","Supremo","Grand Don","Godfather"
    },
    visual = { color = "Black & Red", icon = "fedora" },
    notes = "Contracts, extortion, bribery, and deep influence mechanics."
  },

  Raiders = {
    displayName = "Raiders",
    role = "Looting and hit-and-run groups; PvE antagonists and PvP raiders.",
    ranks = {
      "Raider","Scout","Skirmisher","Marauder","Raider II","Veteran Raider","Shock Troop","Savage","Brute","Raids Sergeant",
      "Raid Lieutenant","Raid Captain","Raid Commander","Regional Raider","Warlord","Raider Chief","Plunder Master","Raid Director","Chief Marauder","Grand Raider"
    },
    visual = { color = "Rust Red", icon = "crossed_axes" },
    notes = "Fast raids with loot/timer mechanics; often enemy faction."
  },

  Super_Mafia = {
    displayName = "Super Mafia",
    role = "Trans-regional mega-syndicate with political and economic reach.",
    ranks = {
      "Operative","Field Agent","Senior Agent","Crew Leader","Regional Operative","Regional Boss","Regional Don","Council Associate","Council Member","Senior Council Member",
      "Council Chair","Regional Director","Operations Director","Strategic Director","Deputy Supremo","Supremo","Senior Supremo","Executive Supremo","Global Don","Supreme Overlord"
    },
    visual = { color = "Dark Crimson", icon = "globe_dagger" },
    notes = "Rival to state powers; controls large-scale resources and corruption."
  },

  Tharo_Final_Team = {
    displayName = "Tharo Final Team",
    role = "Endgame special ops for climactic or boss-level missions.",
    ranks = {
      "Initiate","Junior Operative","Operative","Senior Operative","Elite Operative","Specialist","Team Lead","Squad Lead","Strike Lead","Field Commander",
      "Senior Field Commander","Operations Lead","Final Team Leader","Deputy Final Commander","Final Team Commander","Final Operations Chief","Endgame Commander","Master Operative","Legendary Operative","Final Overlord"
    },
    visual = { color = "Deep Maroon", icon = "skull_blade" },
    notes = "Reserved for elite players or story milestones."
  },

  HellNah = {
    displayName = "Hell-Nah Division",
    role = "Shock troops specializing in psychological and chaotic warfare.",
    ranks = {
      "Rabble","Footman","Enforcer","Brute","Executioner","Shock Troop","Shock Leader","War Sergeant","War Captain","War Commander",
      "Terror Captain","Terror Commander","Warlord","Senior Warlord","Hell-Chief","Chaos Chief","Annihilator","Pyro Commander","Molten Warlord","Infernal Overlord"
    },
    visual = { color = "Fiery Orange", icon = "molten_fist" },
    notes = "Often outlawed with unpredictable behavior mechanics." 
  },

  YoWhatA = {
    displayName = "Yo-What-A Division",
    role = "Wildcard specialists for improvisation, comedic or unusual missions.",
    ranks = {
      "Rookie","Prankster","Wildcard","Trickster","Improviser","Tactician","Coordinator","Squad Coordinator","Field Coordinator","Lead Improviser",
      "Chaos Sergeant","Chaos Captain","Event Lead","Coordinator Lead","Operations Joker","Senior Wildcard","Chief Improviser","Wildcard Commander","Anomalous Chief","YoWhatA Overlord"
    },
    visual = { color = "Electric Magenta", icon = "question_mark" },
    notes = "Great for events, comedy, and unusual abilities."
  },

  Final_Boss = {
    displayName = "Final Boss Division",
    role = "Ultimate antagonist faction or final-boss hierarchy for endgame content.",
    ranks = {
      "Underboss","Lieutenant","Senior Lieutenant","Captain of Chaos","Warlord","Field Marshal","Boss","High Boss","Grand Boss","Overboss",
      "Lord Commander","Supreme Commander","Archboss","Final General","Apex Boss","Endgame Master","Final Warlord","Eternal Overlord","Celestial Overlord","Final Overlord"
    },
    visual = { color = "Black & Purple", icon = "crown_thorns" },
    notes = "Designed for endgame PvE encounters and story climaxes."
  }
}

-- Ensure every division has at least MIN_RANKS ranks.
local function ensureMinRanks(tbl, minRanks)
  for key, div in pairs(tbl) do
    div._key = key
    div.ranks = div.ranks or {}
    local count = #div.ranks
    if count < minRanks then
      local last = div.ranks[count] or "Member"
      for i = count + 1, minRanks do
        local candidate
        if type(last) == "string" then
          candidate = last .. " " .. (i - count)
        else
          candidate = "Rank " .. i
        end
        table.insert(div.ranks, candidate)
      end
    end
  end
end

-- Public helper functions
local API = {}
API.Get = function(key)
  return Divisions[key]
end
API.GetAll = function()
  return Divisions
end

-- Enforce a minimum of 20 ranks for gameplay progression
ensureMinRanks(Divisions, 20)

return setmetatable(API, { __index = Divisions })
