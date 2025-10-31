import { useState } from "react";
import { Search, Atom, Beaker, GraduationCap, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface Element {
  id: string;
  symbol: string;
  name: string;
  atomicNumber: number;
  category: string;
  color: string;
  grade?: string[];
}

interface Compound {
  id: string;
  formula: string;
  name: string;
  color: string;
  type: string;
  grade?: string[];
}

interface ElementLibraryProps {
  onAddElement: (element: Element) => void;
  onAddCompound: (compound: Compound) => void;
}

export const ElementLibrary = ({ onAddElement, onAddCompound }: ElementLibraryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<string>("all");

  const elements = [
    { id: "h", symbol: "H", name: "Hydrogen", atomicNumber: 1, category: "nonmetal", color: "#ffffff", grade: ["6-8", "9-10", "11-12"] },
    { id: "he", symbol: "He", name: "Helium", atomicNumber: 2, category: "noble gas", color: "#d9ffff", grade: ["6-8", "9-10", "11-12"] },
    { id: "c", symbol: "C", name: "Carbon", atomicNumber: 6, category: "nonmetal", color: "#909090", grade: ["6-8", "9-10", "11-12"] },
    { id: "n", symbol: "N", name: "Nitrogen", atomicNumber: 7, category: "nonmetal", color: "#3050f8", grade: ["6-8", "9-10", "11-12"] },
    { id: "o", symbol: "O", name: "Oxygen", atomicNumber: 8, category: "nonmetal", color: "#ff0d0d", grade: ["6-8", "9-10", "11-12"] },
    { id: "na", symbol: "Na", name: "Sodium", atomicNumber: 11, category: "alkali metal", color: "#ab5cf2", grade: ["6-8", "9-10", "11-12"] },
    { id: "mg", symbol: "Mg", name: "Magnesium", atomicNumber: 12, category: "alkaline earth metal", color: "#8aff00", grade: ["6-8", "9-10", "11-12"] },
    { id: "al", symbol: "Al", name: "Aluminum", atomicNumber: 13, category: "post-transition metal", color: "#bfa6a6", grade: ["6-8", "9-10", "11-12"] },
    { id: "si", symbol: "Si", name: "Silicon", atomicNumber: 14, category: "metalloid", color: "#f0c8a0", grade: ["6-8", "9-10", "11-12"] },
    { id: "p", symbol: "P", name: "Phosphorus", atomicNumber: 15, category: "nonmetal", color: "#ff8000", grade: ["6-8", "9-10", "11-12"] },
    { id: "s", symbol: "S", name: "Sulfur", atomicNumber: 16, category: "nonmetal", color: "#ffff30", grade: ["6-8", "9-10", "11-12"] },
    { id: "cl", symbol: "Cl", name: "Chlorine", atomicNumber: 17, category: "halogen", color: "#1ff01f", grade: ["6-8", "9-10", "11-12"] },
    { id: "k", symbol: "K", name: "Potassium", atomicNumber: 19, category: "alkali metal", color: "#8f40d4", grade: ["6-8", "9-10", "11-12"] },
    { id: "ca", symbol: "Ca", name: "Calcium", atomicNumber: 20, category: "alkaline earth metal", color: "#3dff00", grade: ["6-8", "9-10", "11-12"] },
    { id: "fe", symbol: "Fe", name: "Iron", atomicNumber: 26, category: "transition metal", color: "#e06633", grade: ["6-8", "9-10", "11-12"] },
    { id: "cu", symbol: "Cu", name: "Copper", atomicNumber: 29, category: "transition metal", color: "#c88033", grade: ["6-8", "9-10", "11-12"] },
    { id: "zn", symbol: "Zn", name: "Zinc", atomicNumber: 30, category: "transition metal", color: "#7d80b0", grade: ["6-8", "9-10", "11-12"] },
    { id: "ag", symbol: "Ag", name: "Silver", atomicNumber: 47, category: "transition metal", color: "#c0c0c0", grade: ["6-8", "9-10", "11-12"] },
    { id: "au", symbol: "Au", name: "Gold", atomicNumber: 79, category: "transition metal", color: "#ffd123", grade: ["6-8", "9-10", "11-12"] },
  ];

  const compounds = [
    { id: "h2o", formula: "H₂O", name: "Water", color: "#87ceeb", type: "molecular", grade: ["6-8", "9-10", "11-12"] },
    { id: "co2", formula: "CO₂", name: "Carbon Dioxide", color: "#e6e6e6", type: "molecular", grade: ["6-8", "9-10", "11-12"] },
    { id: "o2", formula: "O₂", name: "Oxygen Gas", color: "#ff6b6b", type: "molecular", grade: ["6-8", "9-10", "11-12"] },
    { id: "nacl", formula: "NaCl", name: "Sodium Chloride (Salt)", color: "#ffffff", type: "salt", grade: ["6-8", "9-10", "11-12"] },
    { id: "h2", formula: "H₂", name: "Hydrogen Gas", color: "#e6e6fa", type: "molecular", grade: ["6-8", "9-10", "11-12"] },
    { id: "hcl", formula: "HCl", name: "Hydrochloric Acid", color: "#ffff99", type: "acid", grade: ["9-10", "11-12"] },
    { id: "naoh", formula: "NaOH", name: "Sodium Hydroxide", color: "#ffffff", type: "base", grade: ["9-10", "11-12"] },
    { id: "nh3", formula: "NH₃", name: "Ammonia", color: "#66ccff", type: "base", grade: ["6-8", "9-10", "11-12"] },
    { id: "ch4", formula: "CH₄", name: "Methane", color: "#cccccc", type: "molecular", grade: ["6-8", "9-10", "11-12"] },
    { id: "c2h5oh", formula: "C₂H₅OH", name: "Ethanol", color: "#f0f8ff", type: "alcohol", grade: ["11-12"] },
  ];

  const getGradeBadgeColor = (grade: string) => {
    switch (grade) {
      case "6-8": return "bg-green-100 text-green-800 hover:bg-green-200";
      case "9-10": return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "11-12": return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      default: return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const filteredElements = elements.filter(element => {
    const matchesSearch = element.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         element.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         element.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === "all" || element.grade.includes(selectedGrade);
    return matchesSearch && matchesGrade;
  });

  const filteredCompounds = compounds.filter(compound => {
    const matchesSearch = compound.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         compound.formula.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         compound.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === "all" || compound.grade.includes(selectedGrade);
    return matchesSearch && matchesGrade;
  });

  const handleDragStart = (e: React.DragEvent, item: Element | Compound, type: string) => {
    e.dataTransfer.setData('application/json', JSON.stringify({
      ...item,
      type: type
    }));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'nonmetal':
      case 'halogen':
        return <Sparkles className="h-3 w-3" />;
      case 'alkali metal':
      case 'alkaline earth metal':
      case 'transition metal':
      case 'post-transition metal':
        return <Atom className="h-3 w-3" />;
      case 'noble gas':
        return <div className="h-3 w-3 rounded-full bg-blue-300" />;
      case 'metalloid':
        return <div className="h-3 w-3 bg-yellow-400 transform rotate-45" />;
      default:
        return <Atom className="h-3 w-3" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'acid':
        return <div className="h-3 w-3 bg-red-400 rounded-full" />;
      case 'base':
        return <div className="h-3 w-3 bg-blue-400 rounded-full" />;
      case 'salt':
        return <div className="h-3 w-3 bg-gray-300 rounded" />;
      case 'molecular':
        return <Beaker className="h-3 w-3" />;
      case 'alcohol':
      case 'organic':
        return <div className="h-3 w-3 bg-green-400 rounded-full" />;
      default:
        return <Beaker className="h-3 w-3" />;
    }
  };

  return (
    <Card className="h-full bg-white/90 backdrop-blur-sm shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Atom className="h-5 w-5" />
          Chemical Library
        </CardTitle>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search elements or compounds..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap gap-1">
          <Badge
            variant={selectedGrade === "all" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedGrade("all")}
          >
            All Levels
          </Badge>
          <Badge
            variant={selectedGrade === "6-8" ? "default" : "outline"}
            className={`cursor-pointer ${getGradeBadgeColor("6-8")}`}
            onClick={() => setSelectedGrade("6-8")}
          >
            <GraduationCap className="h-3 w-3 mr-1" />
            6-8
          </Badge>
          <Badge
            variant={selectedGrade === "9-10" ? "default" : "outline"}
            className={`cursor-pointer ${getGradeBadgeColor("9-10")}`}
            onClick={() => setSelectedGrade("9-10")}
          >
            <GraduationCap className="h-3 w-3 mr-1" />
            9-10
          </Badge>
          <Badge
            variant={selectedGrade === "11-12" ? "default" : "outline"}
            className={`cursor-pointer ${getGradeBadgeColor("11-12")}`}
            onClick={() => setSelectedGrade("11-12")}
          >
            <GraduationCap className="h-3 w-3 mr-1" />
            11-12
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Tabs defaultValue="elements" className="h-full w-[290px]">
          <TabsList className="grid w-full grid-cols-2 mx-1">
            <TabsTrigger value="elements" className="flex items-center gap-2">
              <Atom className="h-4 w-4" />
              Elements ({filteredElements.length})
            </TabsTrigger>
            <TabsTrigger value="compounds" className="flex items-center gap-21">
              <Beaker className="h-4 w-4" />
              Compounds ({filteredCompounds.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="elements" className="mt-4 px-4">
            <ScrollArea className="h-96">
              <div className="space-y-2">
                {filteredElements.map((element) => (
                  <div
                    key={element.id}
                    className="w-[200px]flex items-center justify-between p-3 border rounded-lg bg-white hover:bg-gray-50 cursor-move transition-colors"
                    draggable
                    onDragStart={(e) => handleDragStart(e, element, 'element')}
                    onClick={() => onAddElement(element)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded border-2 flex items-center justify-center text-xs font-bold"
                        style={{ 
                          backgroundColor: element.color,
                          color: element.color === '#ffffff' ? '#000000' : '#000000',
                          borderColor: element.color === '#ffffff' ? '#e2e8f0' : element.color
                        }}
                      >
                        {element.symbol}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{element.name}</div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          {getCategoryIcon(element.category)}
                          <span>{element.category}</span>
                          <span>•</span>
                          <span>#{element.atomicNumber}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {element.grade.map((grade) => (
                        <Badge
                          key={grade}
                          variant="outline"
                          className={`text-xs ${getGradeBadgeColor(grade)}`}
                        >
                          {grade}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="compounds" className="mt-4 px-4">
            <ScrollArea className="h-96">
              <div className="space-y-2">
                {filteredCompounds.map((compound) => (
                  <div
                    key={compound.id}
                    className="flex items-center justify-between p-3 border rounded-lg bg-white hover:bg-gray-50 cursor-move transition-colors"
                    draggable
                    onDragStart={(e) => handleDragStart(e, compound, 'compound')}
                    onClick={() => onAddCompound(compound)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded border-2 flex items-center justify-center text-xs font-bold"
                        style={{ 
                          backgroundColor: compound.color,
                          color: compound.color === '#ffffff' ? '#000000' : '#000000',
                          borderColor: compound.color === '#ffffff' ? '#e2e8f0' : compound.color
                        }}
                      >
                        {compound.formula.slice(0, 3)}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{compound.name}</div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          {getTypeIcon(compound.type)}
                          <span>{compound.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {compound.grade.map((grade) => (
                        <Badge
                          key={grade}
                          variant="outline"
                          className={`text-xs ${getGradeBadgeColor(grade)}`}
                        >
                          {grade}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <div className="p-4 border-t bg-gray-50/50">
          <div className="text-xs font-medium text-muted-foreground mb-2">Quick Add:</div>
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => onAddCompound({ id: "h2o", formula: "H₂O", name: "Water", color: "#87ceeb", type: "molecular" })}
              className="px-2 py-1 text-xs bg-blue-100 hover:bg-blue-200 rounded transition-colors"
            >
              H₂O
            </button>
            <button
              onClick={() => onAddElement({ id: "na", symbol: "Na", name: "Sodium", atomicNumber: 11, category: "alkali metal", color: "#ab5cf2" })}
              className="px-2 py-1 text-xs bg-purple-100 hover:bg-purple-200 rounded transition-colors"
            >
              Na
            </button>
            <button
              onClick={() => onAddCompound({ id: "hcl", formula: "HCl", name: "Hydrochloric Acid", color: "#ffff99", type: "acid" })}
              className="px-2 py-1 text-xs bg-yellow-100 hover:bg-yellow-200 rounded transition-colors"
            >
              HCl
            </button>
            <button
              onClick={() => onAddElement({ id: "o", symbol: "O", name: "Oxygen", atomicNumber: 8, category: "nonmetal", color: "#ff0d0d" })}
              className="px-2 py-1 text-xs bg-red-100 hover:bg-red-200 rounded transition-colors"
            >
              O₂
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};