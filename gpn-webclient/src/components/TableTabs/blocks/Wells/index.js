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
        },
        {
            title: 'Тип фонда',
            dataIndex: 'fondType',
            key: 'fondType',
        },
        {
            title: 'Группа фонда',
            dataIndex: 'fondGroup',
            key: 'fondGroup',
        },
        {
            title: 'Состояние скважины',
            dataIndex: 'state',
            key: 'state',
        },
        {
            title: 'Сервисная компания',
            dataIndex: 'serviceCompany',
            key: 'serviceCompany',
        },
        {
            title: 'Месторождение',
            dataIndex: 'field',
            key: 'field',
        },
        {
            title: '№ Цех',
            dataIndex: 'manufactoryNumber',
            key: 'manufactoryNumber',
        },
        {
            title: '№ Куст',
            dataIndex: 'custNumber',
            key: 'custNumber',
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