import { Button } from "../../../components/ui/button"
import { Label } from "../../../components/ui/label"
import { DialogDescription, DialogHeader, DialogTitle } from "../../../components/ui/dialog"
import { Input } from "../../../components/ui/input"

export function SettingsLabel({ id, label }: { id: string; label: string }) {
  return (
    <Label htmlFor={id} className="text-left text-xs font-normal">
      {label}
    </Label>
  )
}

export function SettingsButton({
  id,
  disabled,
  label,
  buttonLabel,
  onClick,
}: {
  id: string
  disabled?: boolean
  label: string
  buttonLabel: string
  onClick: () => void
}) {
  return (
    <div className="">
      <SettingsLabel id={id} label={label} />
      <div>
        <Button onClick={onClick} disabled={disabled} variant="outline" className="">
          {buttonLabel}
        </Button>
      </div>
    </div>
  )
}

export function SettingsHeader({ title, description }: { title: string; description: string }) {
  return (
    <DialogHeader className="pb-3 border-b border-slate-300/50">
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription>{description}</DialogDescription>
    </DialogHeader>
  )
}

export function SettingsInput({
  id,
  label,
  value,
  onChange,
  caption,
  onBlur,
}: {
  id: string
  label: string
  value: string
  caption?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: () => void
}) {
  return (
    <div className="">
      <SettingsLabel id={id} label={label} />
      <Input
        id={id}
        className="max-w-xs text-xs bg-zinc-100 h-7 rounded-sm shadow-none"
        value={value}
        maxLength={45}
        onChange={onChange}
        onBlur={onBlur}
      />
      <Label htmlFor={id} className="text-[10px] text-slate-500 font-normal">
        {caption}
      </Label>
    </div>
  )
}

export function SettingsReadonly({ id, label, value }: { id: string; label: string; value: string }) {
  return (
    <div className="">
      <SettingsLabel id={id} label={label} />
      <div id={id} className="col-span-3 text-slate-400 text-sm p-1">
        {value}
      </div>
    </div>
  )
}
