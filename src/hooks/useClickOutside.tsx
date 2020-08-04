import {useEffect, RefObject} from 'react'

const useClickOutside = (ref: RefObject<HTMLElement>, handler: Function) => {
    useEffect(() => {
        const listener = (e : MouseEvent) => {
            //contains只能用于Node对象，所以要给target断言成HTMLElement
            if(!ref.current || ref.current.contains(e.target as HTMLLIElement)){
                return
            }
            handler(e)
        }
        document.addEventListener('click', listener)
        return () =>document.removeEventListener('click', listener)
    }, [ref, handler])
}

export default useClickOutside
