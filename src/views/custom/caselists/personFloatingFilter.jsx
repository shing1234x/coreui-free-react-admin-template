import React, { useCallback, useEffect } from "react";
import { CFormInput } from '@coreui/react'

export default ({model, onModelChange, getValue}) => {

    const valueChanged = useCallback( p => {
        const newValue = p.target.value;
        onModelChange(newValue == '' ? null : newValue);
    });

    useEffect( ()=> {
        console.log('Floating Filter Created');
        return () => console.log('Floating Filter Destroyed');
    }, []);

    return <>
        <div className="MyFloatingFilter">
            <input
                className="ag-input-field-input ag-text-field-input"
                type="text"
                value={model || ''}
                onChange={valueChanged}
                autoComplete="off"
            />
        </div>
    </>;
};