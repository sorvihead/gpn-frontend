import './Instruments.scss';
import { useHistory } from 'react-router-dom';
import React, { memo, useContext, useState } from 'react';
import axios from 'axios';
import { Button, Layout, message, Spin, Table } from 'antd';
import AdditionalInstrumentInfo from './AdditionalInstrumentInfo';
import { FilterContext } from '../../../../context';
import EditableValue from '../../../EditableValue';

const { Content } = Layout;

const ListOfInstruments = () => {
    const {state, dispatch } = useContext(FilterContext);
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
  const onDownload = (facility) => {
    console.log(facility);
    const getExcelTable = (params) => {
        axios.post('api/document/download', params, {
          responseType: 'blob',
        })
        .then((response) => {
          const url = window.URL.createObjectURL(
            new Blob([response.data], {
              type:
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            })
          );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        response.headers['content-disposition'].split('filename=')[1]
      );
      document.body.appendChild(link);
      link.click();
    });
    };
    getExcelTable(facility);
  }
    const columns = [
        {
            title: 'Действия',
            key: 'action',
            render: (record) => (
                <Button type='primary' onClick={() => onDownload(record)}>Скачать акт</Button>
            )
        },
        {
            title: '№ сборки оборудования',
            dataIndex: 'id',
            key: 'id',
            filters: Array.from({length: 100}, (v, k) => k+1).map((val) => ({text: val.toString(), value: val.toString()})),
            onFilter: (value, record) => record.id === value
        },
        {
            title: 'Тип владения оборудованием',
            dataIndex: 'typeOfOwnership',
            key: 'typeOfOwnership',
            filters: [
                {
                    text: "Аренда",
                    value: "Аренда"
                },
                {
                    text: "Сервис",
                    value: "Сервис"
                },
                {
                    text: "Не указано",
                    value: "Не указано"
                }
            ],
            onFilter: (value, record) => record.typeOfOwnership === value
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
            filters: validOptions.currentStatus.map((elem) => ({text: elem, value: elem})),
            onFilter: (value, record) => record.prevStatus === value
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
            ),
            filters: validOptions.currentStatus.map((elem) => ({text: elem, value: elem})),
            onFilter: (value, record) => record.currentStatus === value
        },
    ];
    return (
        <Layout className="list-of-instruments">
            <Content>
                <Table
                    size="small"
                    bordered
                    columns={columns}
                    dataSource={state.facilities}
                    rowKey="id"
                    expandedRowRender={(instrument) => <AdditionalInstrumentInfo instrument={instrument}/>
                    }
                    pagination={false}
                />
            </Content>
        </Layout>
    );
};

export default ListOfInstruments;