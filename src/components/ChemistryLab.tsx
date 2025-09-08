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
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Virtual Chemistry Laboratory</h1>
          <p className="text-muted-foreground text-lg">Explore chemistry safely through interactive experiments</p>
        </div>

        {/* Safety Alert */}
        {safetyAlert && (
          <SafetyAlert message={safetyAlert} onDismiss={() => setSafetyAlert(null)} />
        )}

        {/* Main Lab Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Element Library - Left Column */}
          <div className="lg:col-span-1">
            <ElementLibrary 
              onAddElement={handleAddElement}
              onAddCompound={handleAddCompound}
            />
          </div>

          {/* Central Beaker - Main Column */}
          <div className="lg:col-span-2 flex flex-col items-center">
            <Beaker 
              content={beakerContent}
              isReacting={isReacting}
              onClear={clearBeaker}
            />
          </div>

          {/* Equipment Panel - Right Column */}
          <div className="lg:col-span-1">
            <EquipmentPanel 
              onUseEquipment={handleUseEquipment}
              selectedEquipment={selectedEquipment}
            />
          </div>
        </div>

        {/* Observation Notebook */}
        <ObservationNote 
          observations={observations}
          beakerContent={beakerContent}
        />
      </div>
    </div>
  );
};