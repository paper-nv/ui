import {
  CalendarOutlined,
  GlobalOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import { Skeleton, Avatar, List, Pagination, Button, Empty } from "antd";
import "./profiles.css";
import { useEffect, useState } from "react";
import appServices from "../../services/app/appServices";
import ProfileModal from "../../components/modals/ProfileModal";
import DeleteProfileModal from "../../components/modals/deleteProfileModal";
import converter from "../../utils/converter";

const Billing = () => {
  const [newModal, setNewModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);
  const [options, setOptions] = useState();
  const [pages, setPages] = useState(1);
  const [curent, setCurrent] = useState(1);
  const [delModal, setDelModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState();
  const { DF } = converter;

  const append = (data) => {
    console.log(data);
    setList([
      {
        ...data,
        created_at: new Date(),
      },
      ...list,
    ]);
  };

  const del = (id) => {
    setList(list.filter((item) => item._id !== id));
  };

  const startDelete = (profile) => {
    setSelectedProfile(profile);
    setDelModal(true);
  };

  useEffect(() => {
    isLoading
      ? appServices.companyList(options || "page=1&limit=10").then((res) => {
          console.log(res.data.data);
          setList(res.data.data.docs);
          setPages(res.data.data.totalDocs);
          setIsLoading(false);
        })
      : null;
  }, [isLoading]);

  const pager = (page) => {
    setCurrent(page);
    setOptions(`page=${page}&limit=10`);
    setIsLoading(true);
  };

  console.log(list);

  return (
    <>
      <div>
        {newModal && <ProfileModal close={setNewModal} add={append} />}
        {delModal && (
          <DeleteProfileModal
            close={setDelModal}
            del={del}
            profile={selectedProfile}
          />
        )}

        {isLoading ? (
          <Skeleton active className="h-[200px] mt-20" />
        ) : (
          <div>
            {list.length ? (
              <div>
                <div className="flex my-4 justify-end align-center">
                  <div className="pt-2">
                    <Button
                      onClick={() => {
                        setNewModal(true);
                      }}
                      type="primary"
                      className="Badge py-5 flex items-center "
                      style={{ borderRadius: "25px" }}
                      icon={<PlusOutlined />}
                    >
                      New Profile
                    </Button>
                  </div>
                </div>
                <List
                  //   loading={initLoading}
                  itemLayout="horizontal"
                  // loadMore={loadMore}
                  dataSource={list}
                  renderItem={(item) => (
                    <List.Item className="starboard bg-white card rounded  my-4">
                      <List.Item.Meta
                        style={{
                          padding: "10px 20px",
                        }}
                        title={
                          <div className="flex gap-2 justify-between  items-center">
                            <div className="flex gap-2 items-center w-[90%]">
                              <Avatar
                                src={`https://ui-avatars.com/api/?name=${item.name}`}
                              />
                              <p className="mr-3 font-semibold capitalize text-slate-700">
                                {" "}
                                {item.name}
                              </p>{" "}
                            </div>
                            <span className="bg-red-50 hoveraction px-2 py-1 rounded-full flex justify-center items-center">
                              <a
                                onClick={() => startDelete(item)}
                                className="text-red-500 "
                                key="list-loadmore-more"
                              >
                                <DeleteOutlined />
                              </a>
                            </span>
                            ,
                          </div>
                        }
                        description={
                          <div className="lg:flex justify-start gap-4 p-way ml-2 text-slate-500 ">
                            <p className="overflow-clip flex gap-2 max-w-[100%] ">
                              <MailOutlined /> {item.email}
                            </p>
                            <p>
                              <GlobalOutlined /> {item.address}
                            </p>
                            <p>
                              <PhoneOutlined /> {item.phone}
                            </p>
                            <p>
                              <CalendarOutlined /> {DF(item.created_at)}
                            </p>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </div>
            ) : (
              <div className="my-10">
                <Empty
                  image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                  imageStyle={{
                    height: 60,
                    display: "flex",
                    justifyContent: "center",
                  }}
                  description={
                    <span className="muted">
                      You do not have a billing profile yet
                    </span>
                  }
                >
                  <Button
                    onClick={() => setNewModal(true)}
                    type="primary"
                    icon={<PlusOutlined />}
                    className="rounded-3xl"
                  >
                    Create profile
                  </Button>
                </Empty>
              </div>
            )}
          </div>
        )}
      </div>
      {list.length > 10 ? (
        <div className="flex justify-end mt-10">
          <Pagination
            onChange={(e) => pager(e)}
            defaultCurrent={1}
            current={curent}
            defaultPageSize={10}
            total={pages}
          />
        </div>
      ) : null}
    </>
  );
};

export default Billing;
