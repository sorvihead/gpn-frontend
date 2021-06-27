import { Tabs } from 'antd';
import React from 'react';
import ListOfWells from './blocks/Wells';
import ListOfInstruments from './blocks/Instruments';

const { TabPane } = Tabs;

const TableTabs = () => {
    return (<Tabs size="large" style={{ width: '100%' }} tabBarStyle={{ margin: 0 }}>
        <TabPane tab="Месторождения" key="1">
            <ListOfWells />
        </TabPane>
        <TabPane tab="Резерв/склад" key="2">
            <ListOfInstruments />
        </TabPane>
    </Tabs>)
};

export default TableTabs;
