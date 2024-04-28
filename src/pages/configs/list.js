import { List, useSimpleList } from "@refinedev/antd";
import { usePermissions } from "@refinedev/core";
import { List as AntdList } from "antd";
import { ConfigItem } from "./ConfigItem";
import { Demo } from "./Demo";


export const ConfigList = () => {
    
    const { listProps } = useSimpleList({
        resource: "configs",
        metaData: { populate: ["jmxfile", "inifile","supportingfiles", "project","jmeter","influxdb","private_key","openapifiles","csvfile"] },
    });
   
    return (
        <div>
            <List>
                <AntdList
                    grid={{ gutter: 16, xs: 1 }}
                    style={{
                        justifyContent: "center",
                    }}
                    {...listProps}
                    renderItem={(item) => {
                        const imgurl = `https://loremflickr.com/640/480/animals?random=${Math.random()}`;
                        return <AntdList.Item>
                            <ConfigItem item={item} imgurl={imgurl} />
                        </AntdList.Item>
                    }}
                />
            </List>
               
            <Demo/>
        </div>
    );
};