import React, {useState} from 'react';

import { Layout, Table, Collapse, Descriptions } from 'antd';
import AdditionalInstrumentInfo from '../Instruments/AdditionalInstrumentInfo';
import EditableValue from '../../../EditableValue';


import './Wells.scss';

const { Content } = Layout;

const AdditionalWellInfo = ({ instrument, isLoaded }) => {
    const [validOptions, setValidOptions] = useState({
    currentStatus: ["Выпущено",
                        "Технологический расчет и монтаж",
                        "Доставка на базу",
                        "Необходимо подготовить",
                        "В работе",
                        "Выход из строя",
                        "Демонтаж",
                        "Ремонт/списание"],
  });
    const columns = [
        {
            title: '№ сборки оборудования',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Тип владения оборудованием',
            dataIndex: 'typeOfOwnership',
            key: 'typeOwnership',
        },
        {
            title: 'Глубина спуска',
            dataIndex: 'descentDepth',
            key: 'descentDepth',
        },
        {
            title: 'Номер бригады',
            dataIndex: 'brigadeNumber',
            key: 'brigadeNumber',
        },
        {
            title: 'Предыдущее состояние',
            dataIndex: 'prevStatus',
            key: 'prevStatus',
        },
        {
            title: 'Текущее состояние',
            dataIndex: 'currentStatus',
            key: 'currentStatus',
            render: (currentStatus, record) => (
                <EditableValue
                    record={record}
                    parameterName="currentStatus"
                    value={currentStatus}
                    validValues={validOptions["currentStatus"]}
                />
            )
        },
    ];
    return (
        <Layout className="list-of-instruments">
            <Content>
                <Table
                    size="small"
                    bordered
                    columns={columns}
                    dataSource={[instrument]}
                    rowKey="id"
                    expandedRowRender={(instrument) => <AdditionalInstrumentInfo instrument={instrument}/>
                    }
                    pagination={false}
                />
            </Content>
        </Layout>
    );
}

export default AdditionalWellInfo;