import Slot from 'components/Slot/Slot'
import React from 'react'
import SlotProps from 'types/SlotProps'

function useSlots(children: React.ReactNode): Record<string, Array<React.ReactNode>> {
    const slots: Record<string, Array<React.ReactNode>> = {}

    React.Children.forEach(children, (child) => {
        let slotName = 'default'
        if (React.isValidElement(child) && child.type === Slot) {
            const props = child.props as SlotProps
            slotName = props.name
        }

        if (!(slotName in slots)) {
            slots[slotName] = [child]
        } else {
            slots[slotName].push(child)
        }
    })

    return slots
}

export default useSlots
