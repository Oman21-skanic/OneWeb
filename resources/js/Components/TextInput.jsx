    import React, { forwardRef, useEffect, useRef } from 'react';

    export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, placeholder = '', ...props },
    ref
    ) {
    const internalRef = useRef(null);
    const inputRef = ref || internalRef;

    useEffect(() => {
        if (isFocused && inputRef.current) {
        inputRef.current.focus();
        }
    }, [isFocused, inputRef]);

    return (
        <input
        type={type}
        ref={inputRef}
        placeholder={placeholder}
        className={[
            // Base: transparan + garis bawah hijau
            'mt-2 block w-full appearance-none',
            'border-0 border-b-2 border-green-400/40',
            'bg-transparent text-white placeholder-gray-500',
            // Focus states
            'focus:outline-none focus:ring-0 focus:border-green-500',
            // Transitions
            'transition-all',
            // Disabled states
            'disabled:opacity-50 disabled:cursor-not-allowed',
            // Allow consumer overrides at the end
            className,
        ].join(' ')}
        {...props}
        />
    );
    });
