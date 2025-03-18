import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useTheme } from "@/providers/ThemeContext.ts";
import  ThemeToggle from "@/components/ThemeToggle.tsx";
import { vi, describe, it, beforeEach, expect } from "vitest";

vi.mock("@/providers/ThemeContext", () => ({
    useTheme: vi.fn(),
}));

vi.mock("highcharts", async () => {
    const actual = await vi.importActual<typeof import("highcharts")>("highcharts");
    return {
        ...actual,
        default: actual, // Ensure default export
        setOptions: vi.fn(),
    };
});

describe("ThemeToggle Component", () => {
    let mockToggleTheme;

    beforeEach(() => {
        mockToggleTheme = vi.fn();
    });

    it("renders Dark mode button when theme is light", () => {
        (useTheme as jest.Mock).mockReturnValue({ theme: "light", toggleTheme: mockToggleTheme });
        render(<ThemeToggle />);
        expect(screen.getByText("Dark")).toBeInTheDocument();
    });

    it("renders Light mode button when theme is dark", () => {
        (useTheme as jest.Mock).mockReturnValue({ theme: "dark", toggleTheme: mockToggleTheme });
        render(<ThemeToggle />);
        expect(screen.getByText("Light")).toBeInTheDocument();
    });

    it("toggles theme when button is clicked", async () => {
        (useTheme as jest.Mock).mockReturnValue({ theme: "light", toggleTheme: mockToggleTheme });
        render(<ThemeToggle />);

        const button = screen.getByRole("button");
        await userEvent.click(button);

        expect(mockToggleTheme).toHaveBeenCalled();
        expect(screen.getByText("Dark")).toBeInTheDocument();
    });
});