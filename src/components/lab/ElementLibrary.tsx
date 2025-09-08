import { useState } from "react";
import { Search, Atom, Beaker } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Element, Compound } from "../ChemistryLab";

interface ElementLibraryProps {
  onAddElement: (element: Element) => void;
  onAddCompound: (compound: Compound) => void;
}

export const ElementLibrary = ({ onAddElement, onAddCompound }: ElementLibraryProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const elements: Element[] = [
    { id: "h", symbol: "H", name: "Hydrogen", atomicNumber: 1, category: "nonmetal", color: "#ffffff" },
    { id: "he", symbol: "He", name: "Helium", atomicNumber: 2, category: "noble gas", color: "#d9ffff" },
    { id: "li", symbol: "Li", name: "Lithium", atomicNumber: 3, category: "alkali metal", color: "#cc80ff" },
    { id: "be", symbol: "Be", name: "Beryllium", atomicNumber: 4, category: "alkaline earth metal", color: "#c2ff00" },
    { id: "b", symbol: "B", name: "Boron", atomicNumber: 5, category: "metalloid", color: "#ffb5b5" },
    { id: "c", symbol: "C", name: "Carbon", atomicNumber: 6, category: "nonmetal", color: "#909090" },
    { id: "n", symbol: "N", name: "Nitrogen", atomicNumber: 7, category: "nonmetal", color: "#3050f8" },
    { id: "o", symbol: "O", name: "Oxygen", atomicNumber: 8, category: "nonmetal", color: "#ff0d0d" },
    { id: "f", symbol: "F", name: "Fluorine", atomicNumber: 9, category: "halogen", color: "#90e050" },
    { id: "ne", symbol: "Ne", name: "Neon", atomicNumber: 10, category: "noble gas", color: "#b3e3f5" },
    { id: "na", symbol: "Na", name: "Sodium", atomicNumber: 11, category: "alkali metal", color: "#ab5cf2" },
    { id: "mg", symbol: "Mg", name: "Magnesium", atomicNumber: 12, category: "alkaline earth metal", color: "#8aff00" },
    { id: "al", symbol: "Al", name: "Aluminum", atomicNumber: 13, category: "post-transition metal", color: "#bfa6a6" },
    { id: "si", symbol: "Si", name: "Silicon", atomicNumber: 14, category: "metalloid", color: "#f0c8a0" },
    { id: "p", symbol: "P", name: "Phosphorus", atomicNumber: 15, category: "nonmetal", color: "#ff8000" },
    { id: "s", symbol: "S", name: "Sulfur", atomicNumber: 16, category: "nonmetal", color: "#ffff30" },
    { id: "cl", symbol: "Cl", name: "Chlorine", atomicNumber: 17, category: "halogen", color: "#1ff01f" },
    { id: "ar", symbol: "Ar", name: "Argon", atomicNumber: 18, category: "noble gas", color: "#80d1e3" },
    { id: "k", symbol: "K", name: "Potassium", atomicNumber: 19, category: "alkali metal", color: "#8f40d4" },
    { id: "ca", symbol: "Ca", name: "Calcium", atomicNumber: 20, category: "alkaline earth metal", color: "#3dff00" },
    { id: "fe", symbol: "Fe", name: "Iron", atomicNumber: 26, category: "transition metal", color: "#e06633" },
    { id: "cu", symbol: "Cu", name: "Copper", atomicNumber: 29, category: "transition metal", color: "#c88033" },
    { id: "zn", symbol: "Zn", name: "Zinc", atomicNumber: 30, category: "transition metal", color: "#7d80b0" },
    { id: "ag", symbol: "Ag", name: "Silver", atomicNumber: 47, category: "transition metal", color: "#c0c0c0" },
    { id: "au", symbol: "Au", name: "Gold", atomicNumber: 79, category: "transition metal", color: "#ffd123" },
  ];

  const compounds: Compound[] = [
    { id: "h2o", formula: "H₂O", name: "Water", color: "#87ceeb", type: "molecular" },
    { id: "hcl", formula: "HCl", name: "Hydrochloric Acid", color: "#ffff99", type: "acid" },
    { id: "naoh", formula: "NaOH", name: "Sodium Hydroxide", color: "#ffffff", type: "base" },
    { id: "h2so4", formula: "H₂SO₄", name: "Sulfuric Acid", color: "#ffcc99", type: "acid" },
    { id: "nh3", formula: "NH₃", name: "Ammonia", color: "#66ccff", type: "base" },
    { id: "nacl", formula: "NaCl", name: "Sodium Chloride", color: "#ffffff", type: "salt" },
    { id: "caco3", formula: "CaCO₃", name: "Calcium Carbonate", color: "#f5f5f5", type: "salt" },
    { id: "ch4", formula: "CH₄", name: "Methane", color: "#cccccc", type: "molecular" },
    { id: "co2", formula: "CO₂", name: "Carbon Dioxide", color: "#e6e6e6", type: "molecular" },
    { id: "h2o2", formula: "H₂O₂", name: "Hydrogen Peroxide", color: "#e6f3ff", type: "molecular" },
    { id: "agno3", formula: "AgNO₃", name: "Silver Nitrate", color: "#f0f0f0", type: "salt" },
    { id: "ki", formula: "KI", name: "Potassium Iodide", color: "#ffccff", type: "salt" },
  ];

  const filteredElements = elements.filter(element =>
    element.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    element.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCompounds = compounds.filter(compound =>
    compound.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    compound.formula.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDragStart = (e: React.DragEvent, item: Element | Compound, type: 'element' | 'compound') => {
    e.dataTransfer.setData('application/json', JSON.stringify({ item, type }));
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Atom className="h-5 w-5" />
          Chemical Library
        </CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search elements & compounds..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="elements" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mx-4">
            <TabsTrigger value="elements">Elements</TabsTrigger>
            <TabsTrigger value="compounds">Compounds</TabsTrigger>
          </TabsList>
          
          <TabsContent value="elements" className="m-0">
            <ScrollArea className="h-[500px] px-4">
              <div className="space-y-2 py-2">
                {filteredElements.map((element) => (
                  <div
                    key={element.id}
                    className="element-card"
                    draggable
                    onClick={() => onAddElement(element)}
                    onDragStart={(e) => handleDragStart(e, element, 'element')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-8 h-8 rounded border-2 border-border flex items-center justify-center text-xs font-bold"
                          style={{ backgroundColor: element.color, color: element.color === '#ffffff' ? '#000' : '#fff' }}
                        >
                          {element.symbol}
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{element.name}</div>
                          <div className="text-xs text-muted-foreground">#{element.atomicNumber}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="compounds" className="m-0">
            <ScrollArea className="h-[500px] px-4">
              <div className="space-y-2 py-2">
                {filteredCompounds.map((compound) => (
                  <div
                    key={compound.id}
                    className="element-card"
                    draggable
                    onClick={() => onAddCompound(compound)}
                    onDragStart={(e) => handleDragStart(e, compound, 'compound')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-8 h-8 rounded border-2 border-border flex items-center justify-center"
                          style={{ backgroundColor: compound.color }}
                        >
                          <Beaker className="h-4 w-4 text-foreground" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{compound.name}</div>
                          <div className="text-xs text-muted-foreground">{compound.formula}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};