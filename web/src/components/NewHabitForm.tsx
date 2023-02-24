import { Check } from "phosphor-react";
import * as Checkbox from '@radix-ui/react-checkbox';
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";


const availableWeekDays = [
    'Domingo',
    'Segunda-Feira',
    'Terça-Feira',
    'Quarta-Feira',
    'Quinta-Feira',
    'Sexta-Feira',
    'Sábado'
]

type NewHabitFormProps = {
    onFormSubmitEvent: () => void
}

export function NewHabitForm({onFormSubmitEvent} : NewHabitFormProps) {
    const [title, setTitle] = useState('')
    const [weekDays, setWeekDays] = useState<number[]>([])

    const createNewHabit = async (event: FormEvent) => {
        event.preventDefault()

        if(!title || weekDays.length === 0 ) {
            return
        }

        await api.post('habits', {
            title, weekDays
        })
        setTitle('')
        setWeekDays([])
        onFormSubmitEvent()
        alert('habito criado com sucesso')
        
    }

    const handleToggleWeekDay = (weekDayIndex:number) => {
        if(weekDays.includes(weekDayIndex)){
            setWeekDays( prevState => prevState.filter( index => index !== weekDayIndex))
        }
        else{
            setWeekDays(prevState => [...prevState, weekDayIndex])
        }
    }

    return (
        <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
            <label htmlFor="title" className="font-semibold leading-tight">
                Qual seu comprometimento?
            </label>

            <input type="text" id="title" placeholder="ex.: Exercícios, dormir bem, etc..." autoFocus
                className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900" 
                onChange={event => setTitle(event.target.value)}
                value={title}/>

            <label htmlFor="" className="font-semibold leading-tight mt-4">
                Qual a recorrência?
            </label>

            <div className="flex flex-col gap-2 mt-3">
                {availableWeekDays.map((availableWeekDay,i) => {
                    return (
                        <Checkbox.Root 
                        key={availableWeekDay} 
                        className='flex items-center gap-3 group focus:outline-none'
                        checked={weekDays.includes(i)}
                        onCheckedChange={() => {
                            handleToggleWeekDay(i) 
                        }}
                        >

                            <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-400 transition-colors duration-200
                            group-focus:outline-none group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background'>
                                <Checkbox.Indicator >
                                    <Check size={20} className='text-white' />
                                </Checkbox.Indicator>
                            </div>

                            <span className=' text-white leading-tight'>
                                {availableWeekDay}
                            </span>
                        </Checkbox.Root>
                    )
                })}
            </div>

            <button type="submit"
             className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors duration-300
             focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900" >
                <Check size={20} weight="bold" />
                Confirmar
            </button>
        </form>
    )
}