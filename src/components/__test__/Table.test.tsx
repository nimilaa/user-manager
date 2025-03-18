import { render, screen } from "@testing-library/react";
import { AgGridReact } from "ag-grid-react";
import { useTheme } from "@/providers/ThemeContext";
import Table from "@/components/Table.tsx";
import { vi, describe, it, beforeEach, expect } from "vitest";

vi.mock("@/providers/ThemeContext", () => ({
    useTheme: vi.fn(),
}));

vi.mock("ag-grid-react", () => ({
    AgGridReact: vi.fn(() => <div data-testid="ag-grid" />),
}));

describe("Table Component", () => {
    const mockData = [{
        id: '1',
        name: "Suresh",
        age: 35,
        city: "New York",
        address: "669 Bergen Avenue, Indio, Idaho, 4457",
        company: "Google",
        email: "suresh@gmail.com",
        phone: '+1 (816) 481-2269'
    }];
    const mockColDefs = [{ field: "name" }, { field: "age" }, { field: "city" }, { field: "address" }, { field: "company" }, { field: "email" }, { field: "phone" }];
    const mockDefaultColDef = { sortable: true };
    const mockDoesExternalFilterPass = vi.fn(() => true);

    beforeEach(() => {
        (useTheme as jest.Mock).mockReturnValue({ theme: "light" });
    });

    it("renders ag-Grid component", () => {
        render(
            <Table
                data={mockData}
                colDefs={mockColDefs}
                defaultColDef={mockDefaultColDef}
                externalSearchKey=""
                doesExternalFilterPass={mockDoesExternalFilterPass}
            />
        );
        expect(screen.getByTestId("ag-grid")).toBeInTheDocument();
    });

    it("applies light theme when theme is light", () => {
        (useTheme as jest.Mock).mockReturnValue({ theme: "light" });
        render(
            <Table
                data={mockData}
                colDefs={mockColDefs}
                defaultColDef={mockDefaultColDef}
                externalSearchKey=""
                doesExternalFilterPass={mockDoesExternalFilterPass}
            />
        );
        expect(useTheme).toHaveBeenCalled();
    });
});
