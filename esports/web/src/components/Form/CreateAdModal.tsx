import * as Dialog from "@radix-ui/react-dialog";
import * as CheckBox from "@radix-ui/react-checkbox";
import * as ToggleGroup from '@radix-ui/react-toggle-group';


import { Check, GameController } from "phosphor-react";

import { Input } from "./Input";
import { FormEvent, useEffect, useState } from "react";

import axios from 'axios';


import * as SelectPrimitive from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { blackA, mauve, violet } from "@radix-ui/colors";
import { styled } from "@stitches/react";

interface Game {
    id: string;
    title: string;

}


export function CreateAdModal() {
    const [games, setGames] = useState<Game[]>([])
    const [weekDays, setWeekDays] = useState<string[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState(false)

    useEffect(() => {
        axios('http://localhost:3333/games').then(response => {
            setGames(response.data)
        })
    }, [])

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault()

        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)




        if (!data.game) {
            return alert('Selecione um jogo')
        } else if (!data.name) {
            return alert('Digite um nome')
        } else if (!data.yearsPlaying) {
            return alert('Digite os anos de jogo')
        } else if (!data.discord) {
            return alert('Digite o seu discord')
        } else if (!data.hourStart) {
            return alert('Digite o horário corretamente')
        } else if (!data.hourEnd) {
            return alert('Digite o horário corretamente')
        }

        try {
            await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel
            })
            alert('Anúncio criado com sucesso!')
        } catch (error) {
            console.log(error)
            alert('Erro ao criar anúncio')
        }


    }


    return (
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

            <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
                <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>
                <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4 ">

                    <div className="flex flex-col gap-2">
                        <label htmlFor="game" className="font-semibold">Qual o game?</label>

                        <Box >
                            <Select name="game" >
                                <SelectTrigger className='text-sm  px-4 appearance-none bg-zinc-900 w-[368px] flex flex-row justify-between items-center' aria-label="game">
                                    <SelectValue placeholder="Selecione o game que deseja jogar" />
                                    <SelectIcon>
                                        <ChevronDownIcon className='w-5 h-5 text-zinc-500' />
                                    </SelectIcon>
                                </SelectTrigger>
                                <SelectContent >
                                    <SelectViewport>
                                        <SelectGroup>
                                            {games.map(game => {
                                                return (
                                                    <SelectItem className="text-zinc-300" key={game.id} value={game.id}>
                                                        <SelectItemText>{game.title}</SelectItemText>
                                                        <SelectItemIndicator>
                                                            <CheckIcon />
                                                        </SelectItemIndicator>
                                                    </SelectItem>
                                                )
                                            }
                                            )}
                                        </SelectGroup>
                                    </SelectViewport>
                                </SelectContent>
                            </Select>
                        </Box>


                    </div>

                    <div className="flex flex-col gap-2 ">
                        <label htmlFor="name">Seu nome (ou nickname)</label>
                        <Input name="name" id="name" placeholder="Como te chamam dento do game" />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                            <Input className="appearance-none" name="yearsPlaying" id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="discord">Qual seu Discord?</label>
                            <Input name="discord" id="discord" placeholder="Usuário#0000" />
                        </div>

                    </div>

                    <div className="flex gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="weekDays">Quando costuma jogar?</label>

                            <ToggleGroup.Root
                                className="grid grid-cols-4 gap-2"
                                type="multiple"
                                value={weekDays}
                                onValueChange={setWeekDays}
                            >
                                <ToggleGroup.Item
                                    value="0"
                                    title="Domingo"
                                    className={`w-8 h-8 rounded  ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >
                                    D
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="1"
                                    title="Segunda"
                                    className={`w-8 h-8 rounded  ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >
                                    S
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="2"
                                    title="Terça"
                                    className={`w-8 h-8 rounded  ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >
                                    T
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="3"
                                    title="Quarta"
                                    className={`w-8 h-8 rounded  ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >
                                    Q
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="4"
                                    title="Quinta"
                                    className={`w-8 h-8 rounded  ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >
                                    Q
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="5"
                                    title="Sexta"
                                    className={`w-8 h-8 rounded  ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >
                                    S
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="6"
                                    title="Sábado"
                                    className={`w-8 h-8 rounded  ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >
                                    S
                                </ToggleGroup.Item>
                            </ToggleGroup.Root>

                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                            <label htmlFor="hourStart">Qual horário do dia?</label>
                            <div className="grid grid-cols-2 gap-2">
                                <Input name="hourStart" id="hourStart" type="time" placeholder="De" />
                                <Input name="hourEnd" id="hourEnd" type="time" placeholder="Até" />
                            </div>
                        </div>
                    </div>

                    <label className="mt-2 flex gap-2 text-sm items-center">
                        <CheckBox.Root
                            checked={useVoiceChannel}
                            onCheckedChange={(checked) => {
                                if (checked == true) {
                                    setUseVoiceChannel(true)
                                } else {
                                    setUseVoiceChannel(false)
                                }
                            }}
                            className="w-6 h-6 p-1 rounded bg-zinc-900"
                        >
                            <CheckBox.Indicator>

                                <Check className="w-4 h-4 text-emerald-400" />
                            </CheckBox.Indicator>
                        </CheckBox.Root>
                        Costumo me conectar ao chat de voz
                    </label>

                    <footer className="mt-4 flex justify-end gap-4">
                        <Dialog.DialogClose
                            type="button"
                            className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">Cancelar</Dialog.DialogClose>
                        <button
                            type="submit"
                            className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                        >
                            <GameController size={24} />
                            Encontrar duo
                        </button>
                    </footer>
                </form>
            </Dialog.Content>

        </Dialog.Portal>
    )
}

const StyledTrigger = styled(SelectPrimitive.SelectTrigger, {
    all: 'unset',
    borderRadius: 4,
    fontSize: 13,
    lineHeight: 1,
    height: 44,
    gap: 5,
    backgroundColor: '#18181B',
    boxShadow: `0 2px 10px ${blackA.blackA7}`,
    '&:hover': { backgroundColor: '#18181B' },
    '&:focus': { boxShadow: `0 0 0 2px black` },
    '&[data-placeholder]': { color: '#71717A' },
    cursor: 'pointer',
});

const StyledIcon = styled(SelectPrimitive.SelectIcon, {
    all: 'unset',
});

const StyledContent = styled(SelectPrimitive.Content, {
    overflow: 'hidden',
    backgroundColor: '#18181B',
    borderRadius: 6,
});

const StyledViewport = styled(SelectPrimitive.Viewport, {
    padding: 5,
});

interface Props {
    children?: React.ReactNode;
    // any props that come into the component
}

function Content({ children, ...props }: Props) {
    return (
        <SelectPrimitive.Portal>
            <StyledContent {...props}>{children}</StyledContent>
        </SelectPrimitive.Portal>
    );
}

const StyledItem = styled(SelectPrimitive.Item, { //tela de seleção
    all: 'unset',
    fontSize: 14,
    lineHeight: 1,
    color: '#71717A',
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',
    height: 25,
    width: 350,
    padding: '0 35px 0 25px',
    position: 'relative',
    userSelect: 'none',

    '&[data-disabled]': {
        color: '#18181B',
        pointerEvents: 'none',
    },

    '&[data-highlighted]': {
        backgroundColor: '#71717A',
        color: "#18181B",
    },
    cursor: 'pointer',
});

const StyledLabel = styled(SelectPrimitive.Label, {
    padding: '0 25px',
    fontSize: 12,
    lineHeight: '25px',
    color: "#18181B",
});

const StyledSeparator = styled(SelectPrimitive.Separator, {
    height: 1,
    backgroundColor: violet.violet6,
    margin: 5,
});

const StyledItemIndicator = styled(SelectPrimitive.ItemIndicator, {
    position: 'absolute',
    left: 0,
    width: 25,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const scrollButtonStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 25,
    backgroundColor: '#18181B',
    color: violet.violet11,
    cursor: 'default',
};

const StyledScrollUpButton = styled(SelectPrimitive.ScrollUpButton, scrollButtonStyles);

const StyledScrollDownButton = styled(SelectPrimitive.ScrollDownButton, scrollButtonStyles);

// Exports
export const Select = SelectPrimitive.Root;
export const SelectTrigger = StyledTrigger;
export const SelectValue = SelectPrimitive.Value;
export const SelectIcon = StyledIcon;
export const SelectContent = Content;
export const SelectViewport = StyledViewport;
export const SelectGroup = SelectPrimitive.Group;
export const SelectItem = StyledItem;
export const SelectItemText = SelectPrimitive.ItemText;
export const SelectItemIndicator = StyledItemIndicator;
export const SelectLabel = StyledLabel;
export const SelectSeparator = StyledSeparator;
export const SelectScrollUpButton = StyledScrollUpButton;
export const SelectScrollDownButton = StyledScrollDownButton;

const Box = styled('div', {});

