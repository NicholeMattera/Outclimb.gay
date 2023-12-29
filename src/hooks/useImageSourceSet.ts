import { useMemo } from 'react'
import useVersion from './useVersion'

function useImageSourceSet(image?: string, image2x?: string) {
    const version = useVersion()
    return useMemo(() => {
        if (image2x && version) {
            return `${image}?version=${version} 1x, ${image2x}?version=${version} 2x`
        } else if (image2x) {
            return `${image} 1x, ${image2x} 2x`
        } else if (version) {
            return `${image}?version=${version} 1x`
        }

        return `${image} 1x`
    }, [image, image2x, version])
}

export default useImageSourceSet
