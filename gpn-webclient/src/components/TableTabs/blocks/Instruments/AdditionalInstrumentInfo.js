import React from 'react';
import { Table, Button } from 'antd';
import './Instruments.scss';
import { PrinterOutlined } from '@ant-design/icons';


const { Column } = Table;

const AdditionalInstrumentInfo = ({ instrument }) => (
    <div>
        <div>
            {instrument?.lifecycle?.length > 0 && (
                <Table
                    title={() => 'Жизненные циклы'}
                    bordered
                    dataSource={instrument.lifecycle}
                    pagination={false}
                    className="list-of-instruments__additional-block-item"
                >
                    <Column
                        title="Статус"
                        dataIndex="name"
                        key="name"
                    />
                    <Column
                        title="Дата"
                        dataIndex="date"
                        key="date"
                    />
                    <Column
                        title="Печать"
                        key="print"
                        render = {() => (
                            <Button type="primary" icon={<PrinterOutlined />} />
                        )}
                    />
                </Table>
            )}
        </div>
        <div>
            {instrument?.nodes?.length > 0 && (
                <Table
                    title={() => 'Узлы'}
                    bordered
                    dataSource={instrument.nodes}
                    pagination={false}
                    className="list-of-instruments__additional-block-item"
                >
                    <Column
                        title="Тип узла"
                        dataIndex="type"
                        key="type"
                    />
                    <Column
                        title="Номер"
                        dataIndex="number"
                        key="number"
                    />
                    <Column
                        title="Типоразмер"
                        dataIndex="typeSize"
                        key="typeSize"
                    />
                    <Column
                        title="Состояние"
                        dataIndex="state"
                        key="state"
                    />
                    <Column
                        title="Длина"
                        dataIndex="length"
                        key="length"
                    />
                    <Column
                        title="Класс ээф"
                        dataIndex="classEef"
                        key="classEef"
                    />
                    <Column
                        title="ОПИ"
                        dataIndex="opi"
                        key="opi"
                    />
                    <Column
                        title="Группа исполнения"
                        dataIndex="group"
                        key="group"
                    />
                    <Column
                        title="Сечение"
                        dataIndex="section"
                        key="section"
                    />
                    <Column
                        title="Мощность"
                        dataIndex="power"
                        key="power"
                    />
                    <Column
                        title="Напряжение"
                        dataIndex="voltage"
                        key="voltage"
                    />
                    <Column
                        title="Ток"
                        dataIndex="amperage"
                        key="amperage"
                    />
                    <Column
                        title="Ток холостого хода"
                        dataIndex="noLoadAmperage"
                        key="noLoadAmperage"
                    />
                    <Column
                        title="Количество ступеней"
                        dataIndex="numberOfSteps"
                        key="numberOfSteps"
                    />
                    <Column
                        title="Напор"
                        dataIndex="pressure"
                        key="pressure"
                    />
                </Table>
            )}
        </div>
    </div>
);

export default AdditionalInstrumentInfo;
