import React, {useCallback, useEffect, useRef} from "react";
import {AgGridReact} from "ag-grid-react";
import type { ColDef } from "ag-grid-community";
import {User} from "@/types";

interface TableProps {
    data: User,
    colDefs: ColDef[],
    defaultColDef: ColDef,
    externalSearchKey: string;
    doesExternalFilterPass: (user: User) => boolean;
}

const Table: React.FC<TableProps> = React.memo(({data, colDefs, defaultColDef, externalSearchKey, doesExternalFilterPass}) => {
    const userGrid = useRef(null);

    const handleResize = useCallback(() => {
        userGrid.current!.api.sizeColumnsToFit();
    }, []);

    const onGridReady = useCallback(() => {
        handleResize();
    }, [handleResize]);

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [handleResize]);

    useEffect(() => {
        userGrid.current?.api?.onFilterChanged();
    }, [externalSearchKey])

    const isExternalFilterPresent = useCallback((): boolean => {
        return externalSearchKey !== "";
    }, [externalSearchKey]);

    return (
        <>
            <AgGridReact
                ref={userGrid}
                rowData={data}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                onGridReady={onGridReady}
                isExternalFilterPresent={isExternalFilterPresent}
                doesExternalFilterPass={doesExternalFilterPass}
            />

        </>
    )
});

export default Table;