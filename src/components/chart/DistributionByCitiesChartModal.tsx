import React, {useEffect, useState} from "react";
import Highcharts from 'highcharts'
import HighchartsReact from "highcharts-react-official";
import {Modal, ModalBody, ModalContent} from "@heroui/react";
import {User} from "@/types";

interface DistributionByAgeChartModalProps {
    userData: User[];
    onClose: () => void;
    isOpen: boolean;
}

const DistributionByCityChartModal: React.FC<DistributionByAgeChartModalProps> = React.memo(({userData, isOpen, onClose}) => {
    const [chartOptions, setChartOptions] = useState<Highcharts.Options>();
    const defaultOptions = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Users by Cities'
        },
        xAxis: {
            categories: [],
            crosshair: true,
            title: {
                text: 'Cities'
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
        if(userData) {
            const categories: Set<string> = new Set();
            const processedDataCount: Record<string, number> = {};

            userData.forEach((user: User) => {
                categories.add(user.city);

                if(!processedDataCount[user.city]) {
                    processedDataCount[user.city] = 0;
                }

                processedDataCount[user.city] += 1;
            });

            defaultOptions.xAxis.categories =  Array.from(categories);
            defaultOptions.series.push({
                name: 'Count',
                data: Object.values(processedDataCount)
            });

            setChartOptions(defaultOptions);
        }
    }, [userData])

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="xs:w-full md:w-3/4 max-w-full">
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

export default DistributionByCityChartModal;