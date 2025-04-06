import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ShelterDetail = () => {
  const { sn } = useParams();
  const [shelter, setShelter] = useState({
    lat: "",
    lot: "",
    mngsn: "",
    rearenm: "",
    ronadaddr: "",
    shltsecd: "",
    shltsenm: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/shelter/${sn}`)
      .then((response) => {
        console.log("대피소 목록:", response.data);
        setShelter({
          lat: response.data.LAT,
          lot: response.data.LOT,
          mngsn: response.data.MNG_SN,
          rearenm: response.data.REARE_NM,
          ronadaddr: response.data.RONA_DADDR,
          shltsecd: response.data.SHLT_SE_CD,
          shltsenm: response.data.SHLT_SE_NM,
        });

        if (shelter.lat) {
          var mapContainer = document.getElementById("map"), // 지도를 표시할 div
            mapOption = {
              center: new window.kakao.maps.LatLng(
                response.data.LAT,
                response.data.LOT
              ), // 지도의 중심좌표
              level: 3, // 지도의 확대 레벨
            };

          var map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

          // 마커가 표시될 위치입니다
          var markerPosition = new window.kakao.maps.LatLng(
            response.LAT,
            response.LNG
          );

          // 마커를 생성합니다
          var marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });

          // 마커가 지도 위에 표시되도록 설정합니다
          marker.setMap(map);

          // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
          // marker.setMap(null);
        }
      })
      .catch((error) => {
        console.error("대피소 조회 실패", error);
      });
  }, [sn]);

  if (!shelter) {
    return <h1>대피소 조회 중입니다.</h1>;
  }

  return (
    <MessageDetailLayout>
      <MessageRegion>{shelter.rearenm}</MessageRegion>

      <MessageContainer>
        <MessageNmContainer>
          <MessageStepNm>{shelter.shltsenm}</MessageStepNm>
        </MessageNmContainer>
        <MessageContent>도로명 전체 주소 : {shelter.ronadaddr}</MessageContent>
        <StyledMap id="map"></StyledMap>
      </MessageContainer>
    </MessageDetailLayout>
  );
};

export default ShelterDetail;

const MessageDetailLayout = styled.div`
  margin: 100px;
`;

const MessageRegion = styled.div`
  font-size: 40px;
  margin-bottom: 50px;
`;

const MessageContainer = styled.div`
  width: 1240px;
  height: 1000px;

  border-radius: 16px;
  border: 2px solid #269af9;
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const MessageNmContainer = styled.div`
  display: flex;
  border-radius: 50px;
  background: #b4e2ff;
  height: fit-content;
  width: fit-content;
  align-items: center;
  padding: 0 30px;
  margin: 60px;
`;

const MessageStepNm = styled.span`
  font-size: 30px;
`;

const MessageContent = styled.div`
  margin: 40px 70px;
  font-size: 30px;
`;

const StyledMap = styled.div`
  width: 90%;
  height: 400px;
  margin: 0 auto;
  border: 1px solid lightgrey;
  border-radius: 16px;
`;
