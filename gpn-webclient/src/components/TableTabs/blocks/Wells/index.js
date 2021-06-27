import './Wells.scss';
import { useHistory } from 'react-router-dom';
import React, { memo, useContext, useState } from 'react';
import axios from 'axios';
import { Button, Layout, message, Spin, Table } from 'antd';
import { AppstoreAddOutlined, DeleteOutlined } from '@ant-design/icons';
import AdditionalWellInfo from './AdditionalWellInfo'
import { FilterContext } from '../../../../context';


const { Content } = Layout;

const ListOfWells = () => {
    const {state, dispatch } = useContext(FilterContext);
    const columns = [
        {
            title: '№ скважины',
            dataIndex: 'id',
            key: 'id',
            filters: Array.from({length: 100}, (v, k) => k+1).map((val) => ({text: val.toString(), value: val.toString()})),
            onFilter: (value, record) => record.id === value
        },
        {
            title: 'Тип фонда',
            dataIndex: 'fondType',
            key: 'fondType',
            filters: [
                {
                    text: "Водозаборные",
                    value: "Водозаборные",
                },
                {
                    text: "Нефтяные",
                    value: "Нефтяные",
                },
            ],
            onFilter: (value, record) => record.fondType === value
        },
        {
            title: 'Группа фонда',
            dataIndex: 'fondGroup',
            key: 'fondGroup',
            filters: [
                {
                    text: "Действующий",
                    value: "Действующий"
                }
            ],
            onFilter: (value, record) => record.fondGroup === value
        },
        {
            title: 'Состояние скважины',
            dataIndex: 'state',
            key: 'state',
            filters: [
                {
                    text: "Остановлена",
                    value: "Остановлена",
                },
                {
                    text: "В работе",
                    value: "В работе",
                },
            ],
            onFilter: (value, record) => record.state === value
        },
        {
            title: 'Сервисная компания',
            dataIndex: 'serviceCompany',
            key: 'serviceCompany',
            filters: [
                {
                    text: "Новомет",
                    value: "Новомет",
                },
                {
                    text: "Новые технологии",
                    value: "Новые технологии",
                },
                {
                    text: "СЦ ЭПУ",
                    value: "СЦ ЭПУ",
                },
            ],
            onFilter: (value, record) => record.serviceCompany === value
        },
        {
            title: 'Месторождение',
            dataIndex: 'field',
            key: 'field',
            filters: [
                {
                    text: "Месторождение_3",
                    value: "Месторождение_3"
                }
            ],
            onFilter: (value, record) => record.field === value
        },
        {
            title: '№ Цех',
            dataIndex: 'manufactoryNumber',
            key: 'manufactoryNumber',
            filters: [
                {
                    text: "3",
                    value: 3
                }
            ],
            onFilter: (value, record) => record.manufactoryNumber === value
        },
        {
            title: '№ Куст',
            dataIndex: 'custNumber',
            key: 'custNumber',
            filters: Array.from({length: 20}, (v, k) => k+1).map((val) => ({text: (val-1).toString(), value: (val-1)})),
            onFilter: (value, record) => record.custNumber === value
        },
    ];
    return (
        <Layout className="list-of-wells">
            <Content>
                <Table
                    size="small"
                    bordered
                    columns={columns}
                    dataSource={state.wells}
                    rowKey="id"
                    expandedRowRender={(well) => <AdditionalWellInfo instrument={well.facility} isLoaded={false} />}
                    pagination={false}
                />
            </Content>
        </Layout>
    );
};

export default ListOfWells;