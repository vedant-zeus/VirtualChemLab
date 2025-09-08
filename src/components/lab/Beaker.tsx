import { useState, useEffect } from "react";
import { Thermometer, RotateCcw, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BeakerContent } from "../ChemistryLab";

interface BeakerProps {
  content: BeakerContent;
  isReacting: boolean;
  onClear: () => void;
}

export const Beaker = ({ content, isReacting, onClear }: BeakerProps) => {
  const [bubbles, setBubbles] = useState<{ id: number; x: number; y: number; delay: number }[]>([]);
  const [dragOver, setDragOver] = useState(false);

  // Generate bubbles when reacting
  useEffect(() => {
    if (isReacting) {
      const newBubbles = Array.from({ length: 12 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 80 + 10, // 10-90% from left
        y: Math.random() * 20 + 60, // 60-80% from top
        delay: Math.random() * 2
      }));
      setBubbles(newBubbles);
    } else {
      setBubbles([]);
    }
  }, [isReacting]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      // This would be handled by the parent component
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

  // Calculate liquid level based on content
  const liquidLevel = Math.min(85, Math.max(15, (content.elements.length + content.compounds.length) * 10 + 15));
  
  // Determine liquid color based on content
  const getLiquidColor = () => {
    if (content.elements.length === 0 && content.compounds.length === 0) {
      return 'transparent';
    }
    
    // Simple color mixing logic
    const colors = [
      ...content.elements.map(e => e.color),
      ...content.compounds.map(c => c.color)
    ];
    
    if (colors.includes('#ff0d0d') && colors.includes('#3050f8')) {
      return '#8B4CB8'; // Purple for oxygen + nitrogen
    }
    if (colors.includes('#ab5cf2') && colors.includes('#87ceeb')) {
      return '#FFB84D'; // Orange for sodium + water reaction
    }
    if (colors.includes('#c88033') && colors.includes('#ffff99')) {
      return '#66BB6A'; // Green for copper + HCl
    }
    
    return colors[colors.length - 1] || '#87ceeb';
  };

  const getTemperatureColor = () => {
    if (content.temperature > 100) return 'text-red-500';
    if (content.temperature > 50) return 'text-orange-500';
    return 'text-blue-500';
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Beaker Container */}
      <div className="relative">
        <Card 
          className={`
            beaker-container w-64 h-80 relative overflow-hidden
            ${dragOver ? 'ring-2 ring-primary shadow-lg' : ''}
            ${isReacting ? 'reacting' : ''}
          `}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {/* Beaker Liquid */}
          <div 
            className="beaker-liquid"
            style={{
              height: `${liquidLevel}%`,
              backgroundColor: getLiquidColor(),
              opacity: content.elements.length + content.compounds.length > 0 ? 0.7 : 0
            }}
          />
          
          {/* Measurement Lines */}
          <div className="absolute left-2 top-0 h-full flex flex-col justify-evenly text-xs text-muted-foreground">
            {[100, 75, 50, 25].map(ml => (
              <div key={ml} className="flex items-center gap-1">
                <div className="w-3 h-px bg-border" />
                <span>{ml}ml</span>
              </div>
            ))}
          </div>
          
          {/* Bubbles */}
          {bubbles.map(bubble => (
            <div
              key={bubble.id}
              className="bubble w-2 h-2"
              style={{
                left: `${bubble.x}%`,
                bottom: `${bubble.y}%`,
                animationDelay: `${bubble.delay}s`
              }}
            />
          ))}
          
          {/* Drop Zone Indicator */}
          {dragOver && (
            <div className="absolute inset-4 border-2 border-dashed border-primary bg-primary/10 rounded-lg flex items-center justify-center">
              <Droplets className="h-8 w-8 text-primary animate-pulse" />
            </div>
          )}
          
          {/* Content Indicators */}
          {(content.elements.length > 0 || content.compounds.length > 0) && (
            <div className="absolute top-4 right-4 space-y-1">
              {content.elements.slice(0, 3).map((element, i) => (
                <div key={element.id} className="text-xs bg-white/80 px-2 py-1 rounded">
                  {element.symbol}
                </div>
              ))}
              {content.compounds.slice(0, 2).map((compound, i) => (
                <div key={compound.id} className="text-xs bg-white/80 px-2 py-1 rounded">
                  {compound.formula}
                </div>
              ))}
              {(content.elements.length + content.compounds.length) > 5 && (
                <div className="text-xs bg-white/80 px-2 py-1 rounded">
                  +{(content.elements.length + content.compounds.length) - 5} more
                </div>
              )}
            </div>
          )}
        </Card>
        
        {/* Beaker Label */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white border rounded px-3 py-1 text-sm font-medium">
          500ml Beaker
        </div>
      </div>

      {/* Controls and Status */}
      <div className="flex flex-col items-center space-y-4 w-full max-w-sm">
        {/* Temperature Display */}
        <div className={`flex items-center gap-2 text-lg font-semibold ${getTemperatureColor()}`}>
          <Thermometer className="h-5 w-5" />
          {content.temperature}°C
        </div>
        
        {/* pH Display */}
        {(content.elements.length > 0 || content.compounds.length > 0) && (
          <div className="text-sm text-muted-foreground">
            pH: {content.ph.toFixed(1)}
          </div>
        )}
        
        {/* Reactions Display */}
        {content.reactions.length > 0 && (
          <div className="text-center space-y-1">
            <div className="text-sm font-medium text-success">Active Reactions:</div>
            {content.reactions.slice(-2).map((reaction, i) => (
              <div key={i} className="text-xs bg-success/10 text-success px-2 py-1 rounded">
                {reaction}
              </div>
            ))}
          </div>
        )}
        
        {/* Clear Button */}
        <Button 
          onClick={onClear}
          variant="outline"
          className="w-full"
          disabled={content.elements.length === 0 && content.compounds.length === 0}
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Clear Beaker
        </Button>
      </div>
    </div>
  );
};