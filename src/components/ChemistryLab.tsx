import { useState } from "react";
import { ElementLibrary } from "./lab/ElementLibrary";
import { Beaker } from "./lab/Beaker";
import { EquipmentPanel } from "./lab/EquipmentPanel";
import { ObservationNote } from "./lab/ObservationNote";
import { SafetyAlert } from "./lab/SafetyAlert";

export interface Element {
  id: string;
  symbol: string;
  name: string;
  atomicNumber: number;
  category: string;
  color: string;
}

export interface Compound {
  id: string;
  formula: string;
  name: string;
  color: string;
  type: string;
}

export interface BeakerContent {
  elements: Element[];
  compounds: Compound[];
  temperature: number;
  ph: number;
  reactions: string[];
}

export interface Equipment {
  id: string;
  name: string;
  icon: string;
  description: string;
  inUse: boolean;
  category?: string;
}

export const ChemistryLab = () => {
  const [beakerContent, setBeakerContent] = useState<BeakerContent>({
    elements: [],
    compounds: [],
    temperature: 20,
    ph: 7,
    reactions: []
  });
  
  const [observations, setObservations] = useState<string[]>([]);
  const [safetyAlert, setSafetyAlert] = useState<string | null>(null);
  const [isReacting, setIsReacting] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

  const handleAddElement = (element: Element) => {
    setBeakerContent(prev => ({
      ...prev,
      elements: [...prev.elements, element]
    }));
    
    // Check for dangerous combinations
    checkSafety([...beakerContent.elements, element], beakerContent.compounds);
    
    // Trigger reaction simulation
    simulateReaction([...beakerContent.elements, element], beakerContent.compounds);
  };

  const handleAddCompound = (compound: Compound) => {
    setBeakerContent(prev => ({
      ...prev,
      compounds: [...prev.compounds, compound]
    }));
    
    checkSafety(beakerContent.elements, [...beakerContent.compounds, compound]);
    simulateReaction(beakerContent.elements, [...beakerContent.compounds, compound]);
  };

  const handleUseEquipment = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    
    if (equipment.name === "Bunsen Burner") {
      setBeakerContent(prev => ({
        ...prev,
        temperature: Math.min(prev.temperature + 50, 300)
      }));
      addObservation(`Heated solution to ${beakerContent.temperature + 50}°C using Bunsen burner`);
    } else if (equipment.name === "Glass Rod") {
      addObservation("Stirred solution with glass rod - mixture appears more homogeneous");
      triggerMixingEffect();
    }
  };

  const checkSafety = (elements: Element[], compounds: Compound[]) => {
    // Simple safety checks
    const hasAcid = compounds.some(c => c.type === "acid");
    const hasBase = compounds.some(c => c.type === "base");
    const hasReactiveMetals = elements.some(e => e.category === "alkali metal");
    
    if (hasAcid && hasBase) {
      setSafetyAlert("Mixing acids and bases can produce heat and gas. Exercise caution!");
    } else if (hasReactiveMetals && compounds.some(c => c.name.includes("water"))) {
      setSafetyAlert("Alkali metals react violently with water! This would be dangerous in real life.");
    } else {
      setSafetyAlert(null);
    }
  };

  const simulateReaction = (elements: Element[], compounds: Compound[]) => {
    if (elements.length === 0 && compounds.length === 0) return;
    
    setIsReacting(true);
    
    setTimeout(() => {
      // Simple reaction simulation
      const newReactions: string[] = [];
      
      if (elements.some(e => e.symbol === "Na") && compounds.some(c => c.formula === "H2O")) {
        newReactions.push("2Na + 2H2O → 2NaOH + H2");
        addObservation("Vigorous bubbling observed! Hydrogen gas is being produced.");
      }
      
      if (elements.some(e => e.symbol === "Cu") && compounds.some(c => c.formula === "HCl")) {
        newReactions.push("Cu + 2HCl → CuCl2 + H2");
        addObservation("Solution turns blue-green. Copper chloride is forming.");
      }
      
      setBeakerContent(prev => ({
        ...prev,
        reactions: [...prev.reactions, ...newReactions]
      }));
      
      setIsReacting(false);
    }, 2000);
  };

  const triggerMixingEffect = () => {
    setIsReacting(true);
    setTimeout(() => setIsReacting(false), 1000);
  };

  const addObservation = (observation: string) => {
    setObservations(prev => [...prev, `${new Date().toLocaleTimeString()}: ${observation}`]);
  };

  const clearBeaker = () => {
    setBeakerContent({
      elements: [],
      compounds: [],
      temperature: 20,
      ph: 7,
      reactions: []
    });
    setSafetyAlert(null);
    addObservation("Beaker cleared and cleaned");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 animate-gradient-x"></div>
      
      {/* Secondary Gradient Layer */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-emerald-900/20"></div>
      
      {/* Animated Orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '6s' }}></div>
      
      {/* Glass Morphism Overlay */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
      
      {/* Lab Equipment Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 text-6xl">⚗️</div>
        <div className="absolute top-40 right-32 text-4xl">🧪</div>
        <div className="absolute bottom-32 left-16 text-5xl">🔬</div>
        <div className="absolute bottom-20 right-20 text-3xl">⚖️</div>
        <div className="absolute top-1/3 left-1/3 text-4xl">🧪</div>
        <div className="absolute top-2/3 right-1/4 text-5xl">⚗️</div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header with Enhanced Styling */}
          <div className="text-center mb-8 animate-in slide-in-from-top duration-1000">
            <div className="inline-block p-8 rounded-2xl bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl mb-6">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent mb-3 animate-pulse">
                Virtual Chemistry Laboratory
              </h1>
              <p className="text-white/80 text-xl font-medium">
                Explore chemistry safely through interactive experiments
              </p>
              <div className="mt-4 flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>

          {/* Safety Alert with Enhanced Styling */}
          {safetyAlert && (
            <div className="mb-6 animate-in slide-in-from-top duration-500">
              <SafetyAlert message={safetyAlert} onDismiss={() => setSafetyAlert(null)} />
            </div>
          )}

          {/* Main Lab Interface with Glass Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            {/* Element Library - Enhanced Glass Card */}
            <div className="lg:col-span-1 animate-in slide-in-from-left duration-700">
              <div className="w-[320px] h-full rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl p-1">
                <ElementLibrary 
                  onAddElement={handleAddElement}
                  onAddCompound={handleAddCompound}
                />
              </div>
            </div>

            {/* Central Beaker - Enhanced Glass Card */}
            <div className="lg:col-span-2 flex flex-col items-center animate-in slide-in-from-bottom duration-700" style={{ animationDelay: '0.2s' }}>
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl p-6">
                <Beaker 
                  content={beakerContent}
                  isReacting={isReacting}
                  onClear={clearBeaker}
                />
              </div>
            </div>

            {/* Equipment Panel - Enhanced Glass Card */}
            <div className="lg:col-span-1 animate-in slide-in-from-right duration-700" style={{ animationDelay: '0.4s' }}>
              <div className="h-full w-[370px] rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl p-1">
                <EquipmentPanel 
                  onUseEquipment={handleUseEquipment}
                  selectedEquipment={selectedEquipment}
                />
              </div>
            </div>
          </div>

          {/* Observation Notebook - Enhanced Glass Card */}
          <div className="animate-in slide-in-from-bottom duration-700" style={{ animationDelay: '0.6s' }}>
            <div className="rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl p-1">
              <ObservationNote 
                observations={observations}
                beakerContent={beakerContent}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 animate-in fade-in duration-1000" style={{ animationDelay: '1s' }}>
            <p className="text-white/60 text-sm">
              Made with ⚗️ for chemistry enthusiasts • Safe virtual experiments for all ages
            </p>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-size: 400% 400%;
            background-position: 0% 50%;
          }
          50% {
            background-size: 400% 400%;
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 15s ease infinite;
        }
      `}</style>
    </div>
  );
};