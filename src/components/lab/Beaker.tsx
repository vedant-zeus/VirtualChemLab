import { useState, useEffect } from "react";
import { Thermometer, RotateCcw, Droplets, Eye, AlertTriangle, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface BeakerContent {
  elements: Array<{ id: string; symbol: string; name: string; color: string; }>;
  compounds: Array<{ id: string; formula: string; name: string; color: string; }>;
  temperature: number;
  ph: number;
  reactions: string[];
}

interface BeakerProps {
  content: BeakerContent;
  isReacting: boolean;
  onClear: () => void;
}

// Common Reactions Popup Component
function CommonReactionsPopup({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-96 p-6 max-h-96 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
          <BookOpen className="h-5 w-5" />
          Common Chemical Reactions
        </h2>
        <div className="space-y-3">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800">Water Formation</h3>
            <p className="text-sm text-blue-700 font-mono">2H₂ + O₂ → 2H₂O</p>
            <p className="text-xs text-blue-600 mt-1">Hydrogen and oxygen combine to form water</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800">Salt Formation</h3>
            <p className="text-sm text-green-700 font-mono">Na + Cl → NaCl</p>
            <p className="text-xs text-green-600 mt-1">Sodium and chlorine form table salt</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-800">Hydrochloric Acid</h3>
            <p className="text-sm text-purple-700 font-mono">H₂ + Cl₂ → 2HCl</p>
            <p className="text-xs text-purple-600 mt-1">Strong acid formation</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <h3 className="font-semibold text-orange-800">Ammonia Formation</h3>
            <p className="text-sm text-orange-700 font-mono">N₂ + 3H₂ → 2NH₃</p>
            <p className="text-xs text-orange-600 mt-1">Haber process for ammonia</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <h3 className="font-semibold text-red-800">Combustion</h3>
            <p className="text-sm text-red-700 font-mono">CH₄ + 2O₂ → CO₂ + 2H₂O</p>
            <p className="text-xs text-red-600 mt-1">Methane combustion</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700 text-white font-semibold transition-colors duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export const Beaker = ({ content, isReacting, onClear }: BeakerProps) => {
  const [bubbles, setBubbles] = useState<{ id: number; x: number; y: number; delay: number }[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [lastAdded, setLastAdded] = useState<string>('');
  const [showSafetyWarning, setShowSafetyWarning] = useState(false);
  const [showReactionsPopup, setShowReactionsPopup] = useState(false);

  // Generate bubbles when reacting
  useEffect(() => {
    if (isReacting) {
      const intensity = Math.min(15, Math.max(8, content.temperature / 10));
      const newBubbles = Array.from({ length: intensity }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 70 + 15, // 15-85% from left
        y: Math.random() * 25 + 55, // 55-80% from top
        delay: Math.random() * 1.5
      }));
      setBubbles(newBubbles);
    } else {
      setBubbles([]);
    }
  }, [isReacting, content.temperature]);

  // Safety warnings
  useEffect(() => {
    const isHighTemp = content.temperature > 80;
    const isExtremePhLow = content.ph < 2;
    const isExtremePhHigh = content.ph > 12;
    setShowSafetyWarning(isHighTemp || isExtremePhLow || isExtremePhHigh);
  }, [content.temperature, content.ph]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      setLastAdded(data.name || data.symbol || 'Unknown compound');
      console.log('Dropped:', data);
    } catch (error) {
      console.error('Error parsing dropped data:', error);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  // Calculate liquid level with smooth animation
  const liquidLevel = Math.min(82, Math.max(12, (content.elements.length + content.compounds.length) * 8 + 15));
  
  // Enhanced liquid color with gradient effects
  const getLiquidColor = () => {
    if (content.elements.length === 0 && content.compounds.length === 0) {
      return 'transparent';
    }
    
    const colors = [
      ...content.elements.map(e => e.color),
      ...content.compounds.map(c => c.color)
    ];
    
    if (colors.includes('#ff0d0d') && colors.includes('#3050f8')) {
      return 'linear-gradient(to bottom, #9D4EDD, #8B4CB8)'; // Purple gradient
    }
    if (colors.includes('#ab5cf2') && colors.includes('#87ceeb')) {
      return 'linear-gradient(to bottom, #FFD93D, #FFB84D)'; // Orange gradient
    }
    if (colors.includes('#c88033') && colors.includes('#ffff99')) {
      return 'linear-gradient(to bottom, #4ADE80, #66BB6A)'; // Green gradient
    }
    
    const baseColor = colors[colors.length - 1] || '#87ceeb';
    return `linear-gradient(to bottom, ${baseColor}CC, ${baseColor})`;
  };

  const getTemperatureColor = () => {
    if (content.temperature > 100) return 'text-red-600';
    if (content.temperature > 70) return 'text-orange-500';
    if (content.temperature > 40) return 'text-yellow-600';
    return 'text-blue-600';
  };

  const getTemperatureIcon = () => {
    if (content.temperature > 80) return '🔥';
    if (content.temperature > 50) return '🌡️';
    return '❄️';
  };

  const getPhColor = () => {
    if (content.ph < 3) return 'text-red-600 bg-red-50';
    if (content.ph < 6) return 'text-orange-600 bg-orange-50';
    if (content.ph > 11) return 'text-purple-600 bg-purple-50';
    if (content.ph > 8) return 'text-blue-600 bg-blue-50';
    return 'text-green-600 bg-green-50';
  };

  const getSteamEffect = () => {
    if (content.temperature > 90) return 'high';
    if (content.temperature > 70) return 'medium';
    if (content.temperature > 50) return 'low';
    return 'none';
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Professional Beaker Container */}
      <div className="relative">
        {/* Steam Effect */}
        {getSteamEffect() !== 'none' && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-1 bg-gray-300 rounded-full animate-pulse ${
                  getSteamEffect() === 'high' ? 'h-8' : getSteamEffect() === 'medium' ? 'h-6' : 'h-4'
                }`}
                style={{
                  animationDelay: `${i * 0.3}s`,
                  opacity: getSteamEffect() === 'high' ? 0.8 : getSteamEffect() === 'medium' ? 0.6 : 0.4
                }}
              />
            ))}
          </div>
        )}

        <Card 
          className={`
            beaker-container w-72 h-80 relative overflow-hidden transition-all duration-300
            border-2 bg-gradient-to-b from-gray-50 to-white shadow-lg
            ${dragOver ? 'ring-4 ring-blue-400 ring-opacity-60 shadow-xl scale-105 border-blue-400' : 'border-gray-300'}
            ${isReacting ? 'animate-pulse' : ''}
          `}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {/* Professional Beaker Shape with Spout */}
          <div className="absolute top-0 right-0 w-8 h-4 bg-white border-r-2 border-t-2 border-gray-300 rounded-tr-lg" />
          
          {/* Beaker Liquid with Enhanced Visual Effects */}
          <div 
            className="absolute bottom-0 left-0 right-0 transition-all duration-700 ease-out"
            style={{
              height: `${liquidLevel}%`,
              background: getLiquidColor(),
              opacity: content.elements.length + content.compounds.length > 0 ? 0.85 : 0,
              boxShadow: content.elements.length > 0 ? 'inset 0 4px 8px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            {/* Liquid Surface Reflection */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-white/30 to-transparent" />
          </div>
          
          {/* Professional Measurement Grid */}
          <div className="absolute left-3 top-6 bottom-6 flex flex-col justify-between">
            {[500, 400, 300, 200, 100, 50].map((ml, index) => (
              <div key={ml} className="flex items-center gap-2">
                <div className={`h-px bg-gray-400 ${index % 2 === 0 ? 'w-6' : 'w-4'}`} />
                <span className={`text-xs font-mono text-gray-600 ${index % 2 === 0 ? 'font-semibold' : ''}`}>
                  {ml}ml
                </span>
              </div>
            ))}
          </div>
          
          {/* Enhanced Bubbles with Realistic Physics */}
          {bubbles.map(bubble => (
            <div
              key={bubble.id}
              className="absolute rounded-full"
              style={{
                left: `${bubble.x}%`,
                bottom: `${bubble.y}%`,
                width: `${4 + Math.random() * 4}px`,
                height: `${4 + Math.random() * 4}px`,
                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(255,255,255,0.3))',
                animation: `bubble-rise ${2 + bubble.delay}s ease-out infinite`,
                animationDelay: `${bubble.delay}s`
              }}
            />
          ))}
          
          {/* Enhanced Drop Zone Indicator */}
          {dragOver && (
            <div className="absolute inset-6 border-3 border-dashed border-blue-500 bg-blue-100/30 rounded-xl flex flex-col items-center justify-center backdrop-blur-sm">
              <Droplets className="h-12 w-12 text-blue-600 animate-bounce mb-2" />
              <span className="text-sm font-semibold text-blue-700">Drop compound here</span>
            </div>
          )}
          
          {/* Professional Content Display */}
          {(content.elements.length > 0 || content.compounds.length > 0) && (
            <div className="absolute top-4 right-6 space-y-2 max-w-32">
              <div className="text-xs font-semibold text-gray-700 border-b pb-1">Contents:</div>
              {content.elements.slice(0, 3).map((element, i) => (
                <div key={element.id} className="text-xs bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm border flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: element.color }} />
                  <span className="font-medium">{element.symbol}</span>
                </div>
              ))}
              {content.compounds.slice(0, 2).map((compound, i) => (
                <div key={compound.id} className="text-xs bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm border flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: compound.color }} />
                  <span className="font-medium">{compound.formula}</span>
                </div>
              ))}
              {(content.elements.length + content.compounds.length) > 5 && (
                <div className="text-xs bg-gray-100/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm border text-center">
                  +{(content.elements.length + content.compounds.length) - 5} more
                </div>
              )}
            </div>
          )}

          {/* Safety Warning Indicator */}
          {showSafetyWarning && (
            <div className="absolute top-4 left-4">
              <AlertTriangle className="h-6 w-6 text-red-500 animate-pulse" />
            </div>
          )}
        </Card>
        
       
        
      </div>

      {/* Enhanced Controls and Status Dashboard */}
      <div className="flex flex-col items-center space-y-4 w-full max-w-sm">
        {/* Temperature Display with Enhanced Visual */}
        <div className={`flex items-center gap-3 text-xl font-bold px-4 py-2 rounded-xl bg-white shadow-md border-2 ${getTemperatureColor().replace('text-', 'border-')}`}>
          <span className="text-2xl">{getTemperatureIcon()}</span>
          <Thermometer className="h-6 w-6" />
          <span>{content.temperature}°C</span>
        </div>
        
        {/* Enhanced pH Display */}
        {(content.elements.length > 0 || content.compounds.length > 0) && (
          <div className={`px-4 py-2 rounded-xl border-2 ${getPhColor()}`}>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span className="font-bold">pH: {content.ph.toFixed(1)}</span>
              <span className="text-xs">
                {content.ph < 7 ? 'Acidic' : content.ph > 7 ? 'Basic' : 'Neutral'}
              </span>
            </div>
          </div>
        )}

        {/* Last Added Indicator */}
        {lastAdded && (
          <div className="text-xs bg-blue-50 text-blue-700 px-3 py-2 rounded-lg border border-blue-200">
            Recently added: <span className="font-semibold">{lastAdded}</span>
          </div>
        )}
        
        {/* Enhanced Reactions Display */}
        {content.reactions.length > 0 && (
          <div className="text-center space-y-2 w-full">
            <div className="flex items-center justify-center gap-2 text-sm font-bold text-emerald-700">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Active Reactions
            </div>
            <div className="space-y-1">
              {content.reactions.slice(-2).map((reaction, i) => (
                <div key={i} className="text-xs bg-emerald-50 text-emerald-800 px-4 py-2 rounded-lg border border-emerald-200 shadow-sm">
                  <code className="font-mono">{reaction}</code>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Common Reactions Button */}
        <Button 
          onClick={() => setShowReactionsPopup(true)}
          variant="outline"
          className="w-full bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border-2 border-blue-300 hover:border-blue-400 font-semibold transition-all duration-200"
        >
          <BookOpen className="h-4 w-4 mr-2" />
          View Common Reactions
        </Button>
        
        {/* Professional Clear Button */}
        <Button 
          onClick={onClear}
          variant="outline"
          className="w-full bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-gray-400 font-semibold transition-all duration-200"
          disabled={content.elements.length === 0 && content.compounds.length === 0}
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Empty & Rinse Beaker
        </Button>
      </div>

      {/* Common Reactions Popup */}
      <CommonReactionsPopup 
        isOpen={showReactionsPopup} 
        onClose={() => setShowReactionsPopup(false)} 
      />

      {/* Professional CSS Animations */}
      <style jsx>{`
        @keyframes bubble-rise {
          0% { 
            transform: translateY(0px) scale(0.8); 
            opacity: 0.8; 
          }
          50% {
            transform: translateY(-20px) scale(1);
            opacity: 1;
          }
          100% { 
            transform: translateY(-40px) scale(0.6); 
            opacity: 0; 
          }
        }
        
        .beaker-container:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

// Demo component to show the beaker in action
export default function BeakerDemo() {
  const [content, setContent] = useState<BeakerContent>({
    elements: [
      { id: '1', symbol: 'H₂', name: 'Hydrogen', color: '#ff0d0d' },
      { id: '2', symbol: 'O₂', name: 'Oxygen', color: '#3050f8' }
    ],
    compounds: [
      { id: '1', formula: 'H₂O', name: 'Water', color: '#87ceeb' }
    ],
    temperature: 25,
    ph: 7.0,
    reactions: ['2H₂ + O₂ → 2H₂O']
  });

  const [isReacting, setIsReacting] = useState(false);

  const handleClear = () => {
    setContent({
      elements: [],
      compounds: [],
      temperature: 20,
      ph: 7.0,
      reactions: []
    });
    setIsReacting(false);
  };

  const startReaction = () => {
    setIsReacting(true);
    setContent(prev => ({
      ...prev,
      temperature: 95,
      ph: 6.2,
      reactions: [...prev.reactions, 'Exothermic reaction in progress!']
    }));
    
    // Add more dramatic reaction effects
    setTimeout(() => {
      setContent(prev => ({
        ...prev,
        temperature: 125,
        ph: 5.8,
        reactions: [...prev.reactions, 'Peak reaction temperature reached!']
      }));
    }, 1000);
    
    setTimeout(() => {
      setContent(prev => ({
        ...prev,
        temperature: 75,
        ph: 6.5,
        reactions: [...prev.reactions, 'Reaction cooling down...']
      }));
    }, 2000);
    
    setTimeout(() => {
      setIsReacting(false);
      setContent(prev => ({
        ...prev,
        temperature: 35,
        ph: 7.1,
        reactions: [...prev.reactions, 'Reaction complete! ✅']
      }));
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Virtual Chemistry Lab
        </h1>
        
        <Beaker 
          content={content}
          isReacting={isReacting}
          onClear={handleClear}
        />
        
        <div className="mt-6 text-center">
          <Button 
            onClick={startReaction}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
            disabled={isReacting}
          >
            {isReacting ? 'Reacting...' : 'Start Reaction'}
          </Button>
        </div>
      </div>
    </div>
  );
}