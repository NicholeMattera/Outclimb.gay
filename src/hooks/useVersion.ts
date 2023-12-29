import { useLocation } from 'react-router-dom'

function useVersion() {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    return params.get('version')
}

export default useVersion
