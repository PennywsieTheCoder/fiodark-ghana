import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'

export function FormCombobox({
  ariaLabel,
  editable = true,
  name,
  onValueChange,
  options,
  placeholder,
  required = false,
  value: controlledValue,
}) {
  const [internalValue, setInternalValue] = useState(controlledValue || '')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const rootRef = useRef(null)
  const inputRef = useRef(null)
  const listId = useId()
  const value = controlledValue ?? internalValue
  const filteredOptions = useMemo(() => {
    if (!editable || !value.trim()) return options
    const query = value.trim().toLowerCase()
    return options.filter((option) => option.toLowerCase().includes(query))
  }, [editable, options, value])

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', closeOnOutsideClick)
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick)
  }, [])

  const updateValue = (nextValue) => {
    setInternalValue(nextValue)
    onValueChange?.(nextValue)
  }

  const selectOption = (option) => {
    updateValue(option)
    setOpen(false)
    inputRef.current?.focus()
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setOpen(false)
      return
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      const direction = event.key === 'ArrowDown' ? 1 : -1
      setActiveIndex((current) => open
        ? Math.max(0, Math.min(filteredOptions.length - 1, current + direction))
        : direction === 1 ? 0 : Math.max(0, filteredOptions.length - 1))
      setOpen(true)
      return
    }
    if (event.key === 'Enter' && open && filteredOptions[activeIndex]) {
      event.preventDefault()
      selectOption(filteredOptions[activeIndex])
    }
  }

  return (
    <div className={`form-combobox${open ? ' is-open' : ''}`} ref={rootRef}>
      {editable ? <input
        ref={inputRef}
        className="form-combobox-control"
        name={name}
        type="text"
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        aria-label={ariaLabel}
        aria-autocomplete="list"
        aria-controls={listId}
        aria-expanded={open}
        role="combobox"
        required={required}
        maxLength={120}
        onChange={(event) => {
          updateValue(event.target.value)
          setActiveIndex(0)
          setOpen(true)
        }}
        onClick={() => setOpen(true)}
        onKeyDown={handleKeyDown}
      /> : <>
        <input name={name} type="hidden" value={value} readOnly />
        <button
          ref={inputRef}
          className="form-combobox-control form-combobox-trigger"
          type="button"
          aria-label={ariaLabel}
          aria-controls={listId}
          aria-expanded={open}
          aria-haspopup="listbox"
          onClick={() => setOpen((current) => !current)}
          onKeyDown={handleKeyDown}
        >{value || placeholder}</button>
      </>}
      <button className="form-combobox-toggle" type="button" aria-label={open ? `Close ${ariaLabel} options` : `Open ${ariaLabel} options`} tabIndex={-1} onClick={() => {
        setOpen((current) => !current)
        inputRef.current?.focus()
      }}><ChevronDown /></button>
      {open && <div className="form-combobox-menu" id={listId} role="listbox">
        {filteredOptions.length > 0 ? filteredOptions.map((option, index) => <button
          className={`${index === activeIndex ? 'is-active' : ''}${option === value ? ' is-selected' : ''}`}
          type="button"
          role="option"
          aria-selected={option === value}
          key={option}
          onMouseEnter={() => setActiveIndex(index)}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => selectOption(option)}
        ><span>{option}</span>{option === value && <Check />}</button>) : <p>Keep typing to use “{value}”</p>}
      </div>}
    </div>
  )
}

const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

const toDateValue = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const parseDateValue = (value) => {
  if (!value) return null
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function ModernDateInput({ min, name }) {
  const minimumDate = parseDateValue(min) || new Date()
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)
  const [viewDate, setViewDate] = useState(new Date(minimumDate.getFullYear(), minimumDate.getMonth(), 1))
  const rootRef = useRef(null)
  const calendarId = useId()
  const todayValue = toDateValue(new Date())
  const minimumValue = toDateValue(minimumDate)
  const monthLabel = viewDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
  const firstWeekDay = (viewDate.getDay() + 6) % 7
  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate()
  const calendarDays = [...Array(firstWeekDay).fill(null), ...Array.from({ length: daysInMonth }, (_, index) => index + 1)]
  const previousMonthDisabled = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0) < new Date(minimumDate.getFullYear(), minimumDate.getMonth(), 1)

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }
    const closeOnEscape = (event) => event.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  const selectDate = (day) => {
    const nextValue = toDateValue(new Date(viewDate.getFullYear(), viewDate.getMonth(), day))
    setValue(nextValue)
    setOpen(false)
  }

  const selectToday = () => {
    const today = new Date()
    setValue(todayValue)
    setViewDate(new Date(today.getFullYear(), today.getMonth(), 1))
    setOpen(false)
  }

  const displayValue = value
    ? parseDateValue(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : 'Select a date'

  return (
    <div className={`modern-date-input${open ? ' is-open' : ''}`} ref={rootRef}>
      <input name={name} type="hidden" value={value} readOnly />
      <button className="modern-date-trigger" type="button" aria-expanded={open} aria-controls={calendarId} aria-haspopup="dialog" onClick={() => setOpen((current) => !current)}>
        <span className={value ? '' : 'is-placeholder'}>{displayValue}</span><CalendarDays aria-hidden="true" />
      </button>
      {open && <div className="modern-calendar" id={calendarId} role="dialog" aria-label="Choose expected shipment date">
        <div className="modern-calendar-head">
          <strong>{monthLabel}</strong>
          <div>
            <button type="button" aria-label="Previous month" disabled={previousMonthDisabled} onClick={() => setViewDate((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))}><ChevronLeft /></button>
            <button type="button" aria-label="Next month" onClick={() => setViewDate((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))}><ChevronRight /></button>
          </div>
        </div>
        <div className="modern-calendar-weekdays">{weekDays.map((day) => <span key={day}>{day}</span>)}</div>
        <div className="modern-calendar-grid">{calendarDays.map((day, index) => {
          if (!day) return <span key={`empty-${index}`} />
          const dayValue = toDateValue(new Date(viewDate.getFullYear(), viewDate.getMonth(), day))
          return <button className={`${dayValue === todayValue ? 'is-today' : ''}${dayValue === value ? ' is-selected' : ''}`} type="button" disabled={dayValue < minimumValue} aria-label={new Date(viewDate.getFullYear(), viewDate.getMonth(), day).toLocaleDateString('en-GB', { dateStyle: 'long' })} aria-pressed={dayValue === value} key={dayValue} onClick={() => selectDate(day)}>{day}</button>
        })}</div>
        <div className="modern-calendar-footer"><button type="button" onClick={() => setValue('')}>Clear</button><button type="button" onClick={selectToday}>Today</button></div>
      </div>}
    </div>
  )
}
