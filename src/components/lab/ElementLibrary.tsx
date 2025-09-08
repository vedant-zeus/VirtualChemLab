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
    // Period 1
    { id: "h", symbol: "H", name: "Hydrogen", atomicNumber: 1, category: "nonmetal", color: "#ffffff" },
    { id: "he", symbol: "He", name: "Helium", atomicNumber: 2, category: "noble gas", color: "#d9ffff" },
    
    // Period 2
    { id: "li", symbol: "Li", name: "Lithium", atomicNumber: 3, category: "alkali metal", color: "#cc80ff" },
    { id: "be", symbol: "Be", name: "Beryllium", atomicNumber: 4, category: "alkaline earth metal", color: "#c2ff00" },
    { id: "b", symbol: "B", name: "Boron", atomicNumber: 5, category: "metalloid", color: "#ffb5b5" },
    { id: "c", symbol: "C", name: "Carbon", atomicNumber: 6, category: "nonmetal", color: "#909090" },
    { id: "n", symbol: "N", name: "Nitrogen", atomicNumber: 7, category: "nonmetal", color: "#3050f8" },
    { id: "o", symbol: "O", name: "Oxygen", atomicNumber: 8, category: "nonmetal", color: "#ff0d0d" },
    { id: "f", symbol: "F", name: "Fluorine", atomicNumber: 9, category: "halogen", color: "#90e050" },
    { id: "ne", symbol: "Ne", name: "Neon", atomicNumber: 10, category: "noble gas", color: "#b3e3f5" },
    
    // Period 3
    { id: "na", symbol: "Na", name: "Sodium", atomicNumber: 11, category: "alkali metal", color: "#ab5cf2" },
    { id: "mg", symbol: "Mg", name: "Magnesium", atomicNumber: 12, category: "alkaline earth metal", color: "#8aff00" },
    { id: "al", symbol: "Al", name: "Aluminum", atomicNumber: 13, category: "post-transition metal", color: "#bfa6a6" },
    { id: "si", symbol: "Si", name: "Silicon", atomicNumber: 14, category: "metalloid", color: "#f0c8a0" },
    { id: "p", symbol: "P", name: "Phosphorus", atomicNumber: 15, category: "nonmetal", color: "#ff8000" },
    { id: "s", symbol: "S", name: "Sulfur", atomicNumber: 16, category: "nonmetal", color: "#ffff30" },
    { id: "cl", symbol: "Cl", name: "Chlorine", atomicNumber: 17, category: "halogen", color: "#1ff01f" },
    { id: "ar", symbol: "Ar", name: "Argon", atomicNumber: 18, category: "noble gas", color: "#80d1e3" },
    
    // Period 4
    { id: "k", symbol: "K", name: "Potassium", atomicNumber: 19, category: "alkali metal", color: "#8f40d4" },
    { id: "ca", symbol: "Ca", name: "Calcium", atomicNumber: 20, category: "alkaline earth metal", color: "#3dff00" },
    { id: "sc", symbol: "Sc", name: "Scandium", atomicNumber: 21, category: "transition metal", color: "#e6e6e6" },
    { id: "ti", symbol: "Ti", name: "Titanium", atomicNumber: 22, category: "transition metal", color: "#bfc2c7" },
    { id: "v", symbol: "V", name: "Vanadium", atomicNumber: 23, category: "transition metal", color: "#a6a6ab" },
    { id: "cr", symbol: "Cr", name: "Chromium", atomicNumber: 24, category: "transition metal", color: "#8a99c7" },
    { id: "mn", symbol: "Mn", name: "Manganese", atomicNumber: 25, category: "transition metal", color: "#9c7ac7" },
    { id: "fe", symbol: "Fe", name: "Iron", atomicNumber: 26, category: "transition metal", color: "#e06633" },
    { id: "co", symbol: "Co", name: "Cobalt", atomicNumber: 27, category: "transition metal", color: "#f090a0" },
    { id: "ni", symbol: "Ni", name: "Nickel", atomicNumber: 28, category: "transition metal", color: "#50d050" },
    { id: "cu", symbol: "Cu", name: "Copper", atomicNumber: 29, category: "transition metal", color: "#c88033" },
    { id: "zn", symbol: "Zn", name: "Zinc", atomicNumber: 30, category: "transition metal", color: "#7d80b0" },
    { id: "ga", symbol: "Ga", name: "Gallium", atomicNumber: 31, category: "post-transition metal", color: "#c28f8f" },
    { id: "ge", symbol: "Ge", name: "Germanium", atomicNumber: 32, category: "metalloid", color: "#668f8f" },
    { id: "as", symbol: "As", name: "Arsenic", atomicNumber: 33, category: "metalloid", color: "#bd80e3" },
    { id: "se", symbol: "Se", name: "Selenium", atomicNumber: 34, category: "nonmetal", color: "#ffa100" },
    { id: "br", symbol: "Br", name: "Bromine", atomicNumber: 35, category: "halogen", color: "#a62929" },
    { id: "kr", symbol: "Kr", name: "Krypton", atomicNumber: 36, category: "noble gas", color: "#5cb8d1" },
    
    // Period 5 (selected elements)
    { id: "rb", symbol: "Rb", name: "Rubidium", atomicNumber: 37, category: "alkali metal", color: "#702eb0" },
    { id: "sr", symbol: "Sr", name: "Strontium", atomicNumber: 38, category: "alkaline earth metal", color: "#00ff00" },
    { id: "ag", symbol: "Ag", name: "Silver", atomicNumber: 47, category: "transition metal", color: "#c0c0c0" },
    { id: "cd", symbol: "Cd", name: "Cadmium", atomicNumber: 48, category: "transition metal", color: "#ffd98f" },
    { id: "in", symbol: "In", name: "Indium", atomicNumber: 49, category: "post-transition metal", color: "#a67573" },
    { id: "sn", symbol: "Sn", name: "Tin", atomicNumber: 50, category: "post-transition metal", color: "#668080" },
    { id: "sb", symbol: "Sb", name: "Antimony", atomicNumber: 51, category: "metalloid", color: "#9e63b5" },
    { id: "te", symbol: "Te", name: "Tellurium", atomicNumber: 52, category: "metalloid", color: "#d47a00" },
    { id: "i", symbol: "I", name: "Iodine", atomicNumber: 53, category: "halogen", color: "#940094" },
    { id: "xe", symbol: "Xe", name: "Xenon", atomicNumber: 54, category: "noble gas", color: "#429eb0" },
    
    // Period 6 (selected elements)
    { id: "cs", symbol: "Cs", name: "Cesium", atomicNumber: 55, category: "alkali metal", color: "#57178f" },
    { id: "ba", symbol: "Ba", name: "Barium", atomicNumber: 56, category: "alkaline earth metal", color: "#00c900" },
    { id: "pt", symbol: "Pt", name: "Platinum", atomicNumber: 78, category: "transition metal", color: "#d0d0e0" },
    { id: "au", symbol: "Au", name: "Gold", atomicNumber: 79, category: "transition metal", color: "#ffd123" },
    { id: "hg", symbol: "Hg", name: "Mercury", atomicNumber: 80, category: "transition metal", color: "#b8b8d0" },
    { id: "tl", symbol: "Tl", name: "Thallium", atomicNumber: 81, category: "post-transition metal", color: "#a6544d" },
    { id: "pb", symbol: "Pb", name: "Lead", atomicNumber: 82, category: "post-transition metal", color: "#575961" },
    { id: "bi", symbol: "Bi", name: "Bismuth", atomicNumber: 83, category: "post-transition metal", color: "#9e4fb5" },
    
    // Period 7 (selected elements)
    { id: "rn", symbol: "Rn", name: "Radon", atomicNumber: 86, category: "noble gas", color: "#428296" },
    { id: "ra", symbol: "Ra", name: "Radium", atomicNumber: 88, category: "alkaline earth metal", color: "#007d00" },
  ];

  const compounds: Compound[] = [
    // Common laboratory compounds
    { id: "h2o", formula: "H₂O", name: "Water", color: "#87ceeb", type: "molecular" },
    { id: "hcl", formula: "HCl", name: "Hydrochloric Acid", color: "#ffff99", type: "acid" },
    { id: "naoh", formula: "NaOH", name: "Sodium Hydroxide", color: "#ffffff", type: "base" },
    { id: "h2so4", formula: "H₂SO₄", name: "Sulfuric Acid", color: "#ffcc99", type: "acid" },
    { id: "hno3", formula: "HNO₃", name: "Nitric Acid", color: "#ffddaa", type: "acid" },
    { id: "nh3", formula: "NH₃", name: "Ammonia", color: "#66ccff", type: "base" },
    { id: "koh", formula: "KOH", name: "Potassium Hydroxide", color: "#f0f0f0", type: "base" },
    
    // Salts
    { id: "nacl", formula: "NaCl", name: "Sodium Chloride", color: "#ffffff", type: "salt" },
    { id: "caco3", formula: "CaCO₃", name: "Calcium Carbonate", color: "#f5f5f5", type: "salt" },
    { id: "agno3", formula: "AgNO₃", name: "Silver Nitrate", color: "#f0f0f0", type: "salt" },
    { id: "ki", formula: "KI", name: "Potassium Iodide", color: "#ffccff", type: "salt" },
    { id: "kcl", formula: "KCl", name: "Potassium Chloride", color: "#ffffff", type: "salt" },
    { id: "mgso4", formula: "MgSO₄", name: "Magnesium Sulfate", color: "#f8f8ff", type: "salt" },
    { id: "caso4", formula: "CaSO₄", name: "Calcium Sulfate", color: "#ffffff", type: "salt" },
    { id: "na2co3", formula: "Na₂CO₃", name: "Sodium Carbonate", color: "#f5f5f5", type: "salt" },
    { id: "nahco3", formula: "NaHCO₃", name: "Sodium Bicarbonate", color: "#ffffff", type: "salt" },
    
    // Organic compounds
    { id: "ch4", formula: "CH₄", name: "Methane", color: "#cccccc", type: "molecular" },
    { id: "c2h6", formula: "C₂H₆", name: "Ethane", color: "#d3d3d3", type: "molecular" },
    { id: "c2h4", formula: "C₂H₄", name: "Ethylene", color: "#dcdcdc", type: "molecular" },
    { id: "c2h2", formula: "C₂H₂", name: "Acetylene", color: "#e5e5e5", type: "molecular" },
    { id: "c2h5oh", formula: "C₂H₅OH", name: "Ethanol (Alcohol)", color: "#f0f8ff", type: "alcohol" },
    { id: "ch3oh", formula: "CH₃OH", name: "Methanol", color: "#e6f3ff", type: "alcohol" },
    { id: "c2h5oc2h5", formula: "C₂H₅OC₂H₅", name: "Diethyl Ether", color: "#f5f5dc", type: "ether" },
    { id: "ch3och3", formula: "CH₃OCH₃", name: "Dimethyl Ether", color: "#f0f8ff", type: "ether" },
    { id: "ch3cooh", formula: "CH₃COOH", name: "Acetic Acid", color: "#fff8dc", type: "organic acid" },
    { id: "c6h12o6", formula: "C₆H₁₂O₆", name: "Glucose", color: "#fffacd", type: "molecular" },
    { id: "c6h6", formula: "C₆H₆", name: "Benzene", color: "#f5f5f5", type: "aromatic" },
    
    // Other important compounds
    { id: "co2", formula: "CO₂", name: "Carbon Dioxide", color: "#e6e6e6", type: "molecular" },
    { id: "co", formula: "CO", name: "Carbon Monoxide", color: "#dcdcdc", type: "molecular" },
    { id: "h2o2", formula: "H₂O₂", name: "Hydrogen Peroxide", color: "#e6f3ff", type: "molecular" },
    { id: "so2", formula: "SO₂", name: "Sulfur Dioxide", color: "#ffffe0", type: "molecular" },
    { id: "no", formula: "NO", name: "Nitric Oxide", color: "#ffefd5", type: "molecular" },
    { id: "no2", formula: "NO₂", name: "Nitrogen Dioxide", color: "#ffa07a", type: "molecular" },
    { id: "h2s", formula: "H₂S", name: "Hydrogen Sulfide", color: "#ffff99", type: "molecular" },
    { id: "pcl3", formula: "PCl₃", name: "Phosphorus Trichloride", color: "#f0f8ff", type: "molecular" },
    { id: "ccl4", formula: "CCl₄", name: "Carbon Tetrachloride", color: "#e6e6fa", type: "molecular" },
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