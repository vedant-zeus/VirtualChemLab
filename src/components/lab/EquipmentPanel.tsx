import { 
  Flame, Shuffle, TestTube, Eye, Zap, Droplet, 
  Scale, CircleDot, FlaskConical, Thermometer,
  Clock, Gauge, Beaker, Scissors, Calculator,
  Target, Diamond, Triangle, Square, Circle,
  Hexagon, Octagon, Plus, Minus, Equal,
  RotateCcw, Filter, Layers, Box, Cylinder
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Equipment } from "../ChemistryLab";

interface EquipmentPanelProps {
  onUseEquipment: (equipment: Equipment) => void;
  selectedEquipment: Equipment | null;
}

export const EquipmentPanel = ({ onUseEquipment, selectedEquipment }: EquipmentPanelProps) => {
  const equipment: Equipment[] = [
    // Basic Glassware
    {
      id: "beaker",
      name: "Beaker",
      icon: "beaker",
      description: "Hold and measure larger volumes of liquids",
      inUse: false,
      category: "Glassware"
    },
    {
      id: "test-tube",
      name: "Test Tube",
      icon: "test-tube",
      description: "Hold small amounts of chemicals for reactions",
      inUse: false,
      category: "Glassware"
    },
    {
      id: "conical-flask",
      name: "Conical Flask",
      icon: "flask-conical",
      description: "Mix solutions with reduced spillage risk",
      inUse: false,
      category: "Glassware"
    },
    {
      id: "measuring-cylinder",
      name: "Measuring Cylinder",
      icon: "cylinder",
      description: "Accurately measure liquid volumes",
      inUse: false,
      category: "Glassware"
    },
    {
      id: "round-bottom-flask",
      name: "Round Bottom Flask",
      icon: "circle",
      description: "Heat liquids evenly during reactions",
      inUse: false,
      category: "Glassware"
    },
    {
      id: "flat-bottom-flask",
      name: "Flat Bottom Flask",
      icon: "square",
      description: "Store and mix solutions on flat surfaces",
      inUse: false,
      category: "Glassware"
    },
    {
      id: "burette",
      name: "Burette",
      icon: "droplet",
      description: "Deliver precise volumes in titrations",
      inUse: false,
      category: "Glassware"
    },
    {
      id: "pipette",
      name: "Pipette",
      icon: "droplet",
      description: "Transfer exact volumes of liquids",
      inUse: false,
      category: "Glassware"
    },
    {
      id: "volumetric-flask",
      name: "Volumetric Flask",
      icon: "diamond",
      description: "Prepare solutions of exact concentrations",
      inUse: false,
      category: "Glassware"
    },
    {
      id: "petri-dish",
      name: "Petri Dish",
      icon: "circle-dot",
      description: "Grow cultures and observe specimens",
      inUse: false,
      category: "Glassware"
    },
    {
      id: "watch-glass",
      name: "Watch Glass",
      icon: "circle",
      description: "Cover beakers and hold small samples",
      inUse: false,
      category: "Glassware"
    },
    
    // Heating Equipment
    {
      id: "bunsen-burner",
      name: "Bunsen Burner",
      icon: "flame",
      description: "Provide controlled flame for heating",
      inUse: false,
      category: "Heating"
    },
    {
      id: "electric-heater",
      name: "Hot Plate",
      icon: "zap",
      description: "Electric heating with temperature control",
      inUse: false,
      category: "Heating"
    },
    {
      id: "water-bath",
      name: "Water Bath",
      icon: "layers",
      description: "Gentle heating using hot water",
      inUse: false,
      category: "Heating"
    },
    {
      id: "alcohol-lamp",
      name: "Spirit/Alcohol Lamp",
      icon: "flame",
      description: "Alternative heating source",
      inUse: false,
      category: "Heating"
    },
    
    // Measuring Instruments
    {
      id: "thermometer",
      name: "Thermometer",
      icon: "thermometer",
      description: "Measure temperature of substances",
      inUse: false,
      category: "Measuring"
    },
    {
      id: "balance",
      name: "Electronic Balance",
      icon: "scale",
      description: "Measure mass accurately",
      inUse: false,
      category: "Measuring"
    },
    {
      id: "ph-meter",
      name: "pH Meter",
      icon: "gauge",
      description: "Measure acidity/alkalinity",
      inUse: false,
      category: "Measuring"
    },
    {
      id: "stopwatch",
      name: "Stopwatch",
      icon: "clock",
      description: "Time chemical reactions",
      inUse: false,
      category: "Measuring"
    },
    
    // Tools and Accessories
    {
      id: "glass-rod",
      name: "Glass Rod",
      icon: "shuffle",
      description: "Stir solutions without contamination",
      inUse: false,
      category: "Tools"
    },
    {
      id: "spatula",
      name: "Spatula",
      icon: "minus",
      description: "Transfer solid chemicals",
      inUse: false,
      category: "Tools"
    },
    {
      id: "tongs",
      name: "Tongs",
      icon: "scissors",
      description: "Handle hot objects safely",
      inUse: false,
      category: "Tools"
    },
    {
      id: "test-tube-holder",
      name: "Test Tube Holder",
      icon: "target",
      description: "Hold test tubes during heating",
      inUse: false,
      category: "Tools"
    },
    {
      id: "wire-gauze",
      name: "Wire Gauze",
      icon: "layers",
      description: "Distribute heat evenly",
      inUse: false,
      category: "Tools"
    },
    {
      id: "tripod-stand",
      name: "Tripod Stand",
      icon: "triangle",
      description: "Support apparatus during heating",
      inUse: false,
      category: "Tools"
    },
    {
      id: "retort-stand",
      name: "Retort Stand",
      icon: "box",
      description: "Hold and clamp laboratory equipment",
      inUse: false,
      category: "Tools"
    },
    {
      id: "clamp",
      name: "Clamp",
      icon: "scissors",
      description: "Secure apparatus to stands",
      inUse: false,
      category: "Tools"
    },
    {
      id: "cork-borer",
      name: "Cork Borer",
      icon: "circle-dot",
      description: "Make holes in rubber/cork stoppers",
      inUse: false,
      category: "Tools"
    },
    {
      id: "rubber-stopper",
      name: "Rubber Stopper",
      icon: "hexagon",
      description: "Seal flasks and test tubes",
      inUse: false,
      category: "Tools"
    },
    
    // Observation Tools
    {
      id: "magnifying-glass",
      name: "Magnifying Glass",
      icon: "eye",
      description: "Observe small details and crystals",
      inUse: false,
      category: "Observation"
    },
    {
      id: "microscope",
      name: "Microscope",
      icon: "eye",
      description: "Examine microscopic specimens",
      inUse: false,
      category: "Observation"
    },
    
    // Separation Equipment
    {
      id: "funnel",
      name: "Funnel",
      icon: "triangle",
      description: "Transfer liquids without spilling",
      inUse: false,
      category: "Separation"
    },
    {
      id: "filter-paper",
      name: "Filter Paper",
      icon: "filter",
      description: "Separate solids from liquids",
      inUse: false,
      category: "Separation"
    },
    {
      id: "separating-funnel",
      name: "Separating Funnel",
      icon: "diamond",
      description: "Separate immiscible liquids",
      inUse: false,
      category: "Separation"
    },
    {
      id: "evaporating-dish",
      name: "Evaporating Dish",
      icon: "circle",
      description: "Evaporate solvents to concentrate solutions",
      inUse: false,
      category: "Separation"
    },
    {
      id: "crucible",
      name: "Crucible",
      icon: "hexagon",
      description: "Heat substances to very high temperatures",
      inUse: false,
      category: "Separation"
    },
    
    // Safety Equipment
    {
      id: "safety-goggles",
      name: "Safety Goggles",
      icon: "eye",
      description: "Protect eyes from chemicals",
      inUse: false,
      category: "Safety"
    },
    {
      id: "wash-bottle",
      name: "Wash Bottle",
      icon: "droplet",
      description: "Rinse equipment with distilled water",
      inUse: false,
      category: "Safety"
    },
    
    // Advanced Equipment (Higher grades)
    {
      id: "condenser",
      name: "Condenser",
      icon: "rotate-ccw",
      description: "Cool and condense vapors back to liquid",
      inUse: false,
      category: "Advanced"
    },
    {
      id: "distillation-apparatus",
      name: "Distillation Setup",
      icon: "layers",
      description: "Separate liquids by boiling points",
      inUse: false,
      category: "Advanced"
    },
    {
      id: "gas-jar",
      name: "Gas Jar",
      icon: "cylinder",
      description: "Collect and study gases",
      inUse: false,
      category: "Advanced"
    },
    {
      id: "delivery-tube",
      name: "Delivery Tube",
      icon: "minus",
      description: "Transfer gases from one container to another",
      inUse: false,
      category: "Advanced"
    },
    {
      id: "thistle-funnel",
      name: "Thistle Funnel",
      icon: "triangle",
      description: "Add liquids to apparatus under pressure",
      inUse: false,
      category: "Advanced"
    },
    {
      id: "desiccator",
      name: "Desiccator",
      icon: "box",
      description: "Store substances in dry conditions",
      inUse: false,
      category: "Advanced"
    },
    {
      id: "reagent-bottle",
      name: "Reagent Bottle",
      icon: "octagon",
      description: "Store chemical reagents safely",
      inUse: false,
      category: "Storage"
    }
  ];

  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      "flame": Flame,
      "shuffle": Shuffle,
      "test-tube": TestTube,
      "eye": Eye,
      "zap": Zap,
      "droplet": Droplet,
      "scale": Scale,
      "circle-dot": CircleDot,
      "flask-conical": FlaskConical,
      "thermometer": Thermometer,
      "clock": Clock,
      "gauge": Gauge,
      "beaker": Beaker,
      "scissors": Scissors,
      "calculator": Calculator,
      "target": Target,
      "diamond": Diamond,
      "triangle": Triangle,
      "square": Square,
      "circle": Circle,
      "hexagon": Hexagon,
      "octagon": Octagon,
      "plus": Plus,
      "minus": Minus,
      "equal": Equal,
      "rotate-ccw": RotateCcw,
      "filter": Filter,
      "layers": Layers,
      "box": Box,
      "cylinder": Cylinder
    };
    return iconMap[iconName] || TestTube;
  };

  // Group equipment by category
  const categories = [...new Set(equipment.map(item => item.category))];
  const groupedEquipment = categories.reduce((acc, category) => {
    acc[category] = equipment.filter(item => item.category === category);
    return acc;
  }, {} as Record<string, typeof equipment>);

  const categoryColors: Record<string, string> = {
    "Glassware": "bg-blue-100 text-blue-800",
    "Heating": "bg-red-100 text-red-800",
    "Measuring": "bg-green-100 text-green-800",
    "Tools": "bg-yellow-100 text-yellow-800",
    "Observation": "bg-purple-100 text-purple-800",
    "Separation": "bg-indigo-100 text-indigo-800",
    "Safety": "bg-orange-100 text-orange-800",
    "Advanced": "bg-pink-100 text-pink-800",
    "Storage": "bg-gray-100 text-gray-800"
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TestTube className="h-5 w-5" />
          Lab Equipment
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[500px] px-4">
          <div className="space-y-4 py-2">
            {Object.entries(groupedEquipment).map(([category, items]) => (
              <div key={category} className="space-y-2">
                <div className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 py-1">
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${categoryColors[category]}`}>
                    {category} ({items.length})
                  </div>
                </div>
                
                <div className="space-y-2">
                  {items.map((item) => {
                    const IconComponent = getIcon(item.icon);
                    const isSelected = selectedEquipment?.id === item.id;
                    
                    return (
                      <div
                        key={item.id}
                        className={`
                          w-[320px] lab-equipment cursor-pointer transition-all duration-200 hover:shadow-md
                          ${isSelected ? 'ring-2 ring-primary bg-primary/10' : 'hover:bg-muted/50'}
                        `}
                        onClick={() => onUseEquipment(item)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-equipment-accent rounded-lg flex items-center justify-center">
                              <IconComponent className="h-5 w-5 text-primary" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm">{item.name}</div>
                            <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                              {item.description}
                            </div>
                          </div>
                        </div>
                        
                        {isSelected && (
                          <div className="mt-2 text-xs text-primary font-medium flex items-center gap-1">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            Equipment Selected
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        {/* Equipment Instructions */}
        <div className="px-4 py-3 border-t bg-muted/50 animate-in slide-in-from-bottom-4 fade-in duration-500">
          <div className="text-xs text-muted-foreground space-y-1">
            <div><strong>How to use:</strong> Click on equipment to select and use it with your current experiment.</div>
            <div className="flex flex-wrap gap-1 mt-2">
              {Object.entries(categoryColors).map(([category, colorClass], index) => (
                <span 
                  key={category} 
                  className={`
                    px-2 py-0.5 rounded-full text-xs ${colorClass}
                    animate-in slide-in-from-bottom-2 fade-in duration-300
                    hover:scale-110 hover:shadow-sm transition-all duration-200 cursor-default
                  `}
                  style={{
                    animationDelay: `${800 + (index * 50)}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};