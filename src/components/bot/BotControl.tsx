import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Zap, ShieldAlert, Cpu, Activity } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const BotControl: React.FC = () => {
  const { botSettings, setBotSettings } = useStore();

  const handleToggle = (enabled: boolean) => {
    setBotSettings({ isEnabled: enabled });
    if (enabled) {
      toast.success('Bot strategy activated!', {
        description: `Running ${botSettings.strategy} with ${botSettings.riskLevel} risk level.`,
      });
    } else {
      toast.warning('Bot execution paused.');
    }
  };

  return (
    <div className="bg-[#1a1b1e] border border-gray-800 rounded-2xl p-6 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${botSettings.isEnabled ? 'bg-green-600/20 text-green-500' : 'bg-gray-800 text-gray-500'}`}>
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white leading-none">Automated Bot</h3>
            <p className="text-xs text-gray-500 mt-1">Smart algorithmic trading</p>
          </div>
        </div>
        <Switch
          checked={botSettings.isEnabled}
          onCheckedChange={handleToggle}
          className="data-[state=checked]:bg-green-600"
        />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
            <Cpu className="w-4 h-4" /> Trading Strategy
          </label>
          <Select
            value={botSettings.strategy}
            onValueChange={(val: any) => setBotSettings({ strategy: val })}
            disabled={botSettings.isEnabled}
          >
            <SelectTrigger className="bg-[#0f1115] border-gray-700 text-white">
              <SelectValue placeholder="Select strategy" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1b1e] border-gray-700 text-white">
              <SelectItem value="MA_CROSSOVER">MA Crossover</SelectItem>
              <SelectItem value="RSI_SIGNALS">RSI Overbought/Oversold</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" /> Risk Management
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['LOW', 'MEDIUM', 'HIGH'] as const).map((risk) => (
              <button
                key={risk}
                disabled={botSettings.isEnabled}
                onClick={() => setBotSettings({ riskLevel: risk })}
                className={`py-2 rounded-lg text-xs font-bold transition-all ${
                  botSettings.riskLevel === risk
                    ? risk === 'LOW' ? 'bg-green-600/20 text-green-500 border border-green-500/50' :
                      risk === 'MEDIUM' ? 'bg-yellow-600/20 text-yellow-500 border border-yellow-500/50' :
                      'bg-red-600/20 text-red-500 border border-red-500/50'
                    : 'bg-gray-800 text-gray-500 hover:bg-gray-700'
                }`}
              >
                {risk}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 bg-blue-600/5 rounded-xl border border-blue-500/10 mt-4">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider">Live Status</p>
              <p className="text-sm text-gray-400 mt-1">
                {botSettings.isEnabled 
                  ? `Bot is actively monitoring ${botSettings.selectedAssets.join(', ')}...`
                  : 'Adjust settings and toggle the switch above to start the bot.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotControl;