import {
  Cpu,
  MonitorPlay,
  MemoryStick,
  CircuitBoard,
  Zap,
  Box,
  HardDrive,
  Keyboard,
  HelpCircle,
} from 'lucide-react'

const icons = {
  CPU: Cpu,
  GPU: MonitorPlay,
  RAM: MemoryStick,
  PLACA_MAE: CircuitBoard,
  FONTE: Zap,
  GABINETE: Box,
  ARMAZENAMENTO: HardDrive,
  PERIFERICO: Keyboard,
}

export default function CategoriaIcon({ categoria, className = 'h-5 w-5' }) {
  const Icon = icons[categoria] || HelpCircle
  return <Icon className={className} />
}
