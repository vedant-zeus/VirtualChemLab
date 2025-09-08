import { Flame, Shuffle, TestTube, Eye, Zap, Droplet } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Equipment } from "../ChemistryLab";

interface EquipmentPanelProps {
  onUseEquipment: (equipment: Equipment) => void;
  selectedEquipment: Equipment | null;
}

export const EquipmentPanel = ({ onUseEquipment, selectedEquipment }: EquipmentPanelProps) => {
  const equipment: Equipment[] = [
    {
      id: "bunsen-burner",
      name: "Bunsen Burner",
      icon: "flame",
      description: "Heat solutions and compounds",
      inUse: false
    },
    {
      id: "glass-rod",
      name: "Glass Rod",
      icon: "stir",
      description: "Stir and mix solutions",
      inUse: false
    },
    {
      id: "test-tube",
      name: "Test Tube",
      icon: "test-tube",
      description: "Hold small amounts of chemicals",
      inUse: false
    },
    {
      id: "magnifying-glass",
      name: "Magnifying Glass",
      icon: "eye",
      description: "Observe reactions closely",
      inUse: false
    },
    {
      id: "electric-heater",
      name: "Electric Heater",
      icon: "zap",
      description: "Controlled heating element",
      inUse: false
    },
    {
      id: "pipette",
      name: "Pipette",
      icon: "pipette",
      description: "Measure and transfer liquids",
      inUse: false
    }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "flame": return Flame;
      case "stir": return Shuffle;
      case "test-tube": return TestTube;
      case "eye": return Eye;
      case "zap": return Zap;
      case "pipette": return Droplet;
      default: return TestTube;
    }
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
          <div className="space-y-3 py-2">
            {equipment.map((item) => {
              const IconComponent = getIcon(item.icon);
              const isSelected = selectedEquipment?.id === item.id;
              
              return (
                <div
                  key={item.id}
                  className={`
                    lab-equipment cursor-pointer
                    ${isSelected ? 'ring-2 ring-primary bg-primary/10' : ''}
                  `}
                  onClick={() => onUseEquipment(item)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-equipment-accent rounded-lg flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm">{item.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {item.description}
                      </div>
                    </div>
                  </div>
                  
                  {isSelected && (
                    <div className="mt-2 text-xs text-primary font-medium">
                      ✓ Equipment Selected
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
        
        {/* Equipment Instructions */}
        <div className="px-4 py-3 border-t bg-muted/50">
          <div className="text-xs text-muted-foreground">
            <strong>How to use:</strong> Click on equipment to select and use it with your current experiment.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};