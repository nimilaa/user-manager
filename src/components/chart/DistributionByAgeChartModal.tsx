import React, {useEffect, useMemo, useState} from "react";
import Highcharts from 'highcharts'
import HighchartsReact from "highcharts-react-official";
import {Modal, ModalBody, ModalContent} from "@heroui/react";
import {User} from "@/types";

interface DistributionByAgeChartModalProps {
    userData: User[];
    onClose: () => void;
    isOpen: boolean;
}

const DistributionByAgeChartModal: React.FC<DistributionByAgeChartModalProps> = React.memo(({
                                                                                                userData,
                                                                                                isOpen,
                                                                                                onClose
                                                                                            }) => {
    const [chartOptions, setChartOptions] = useState<Highcharts.Options>();
    const categories = useMemo(() => [
        {id: '1', label: 'Below 10', lowValue: 0, highValue: 10},
        {id: '2', label: '10 - 20 Years', lowValue: 10, highValue: 20},
        {id: '3', label: '20 - 30 Years', lowValue: 20, highValue: 30},
        {id: '4', label: '30 - 40 Years', lowValue: 30, highValue: 40},
        {id: '5', label: '40 - 50 Years', lowValue: 40, highValue: 50},
        {id: '6', label: 'Above 50', lowValue: 50, highValue: 200},
    ], []);

    const defaultOptions = {
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Users by Age Groups'
        },
        tooltip: {
            valueSuffix: '%'
        },
        xAxis: {
            crosshair: true,
            title: {
                text: 'Age Groups'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'User Count'
            }
        },
        series: []
    }

    useEffect(() => {
        if (userData) {
            const processedDataCount: Record<string, {
                name: string;
                count: number;
            }> = categories.reduce((accumulator, category) => {
                accumulator[category.id] = {name: category.label, count: 0};
                return accumulator;
            }, {});
            const totalUserCount = userData.length;

            userData.forEach((user: User) => {
                const category = categories.find(
                    (category) => user.age >= category.lowValue && user.age < category.highValue
                );

                if (category) {
                    processedDataCount[category.id].count += 1;
                }
            });

            defaultOptions.series.push({
                name: 'Count',
                data: Object.values(processedDataCount).map((processedDataCountItem) => ({
                    name: processedDataCountItem.name, y:(processedDataCountItem.count / totalUserCount) * 100
                }))
            })

            setChartOptions(defaultOptions);
        }
    }, [userData])

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="xs:w-full md:w-1/2 max-w-full">
            <ModalContent>
                <ModalBody className="p-6">
                    {isOpen && userData && chartOptions &&
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={chartOptions}
                        />}
                </ModalBody>
            </ModalContent>
        </Modal>
    )

});

export default DistributionByAgeChartModal;