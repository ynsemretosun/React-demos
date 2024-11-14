import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiOutlineTrash,
} from "react-icons/hi2";
import { useCheckOut } from "../check-in-out/useCheckout";
import { deleteBooking } from "../../services/apiBookings";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { isLoading, booking } = useBooking();
  const { status, id } = booking || {};
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();
  const navigate = useNavigate();
  const moveBack = useMoveBack();

  const { checkOutBooking, isCheckingOut } = useCheckOut();
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  if (isLoading || isCheckingOut) return <Spinner />;
  return (
    <>
      <Modal>
        <Row type="horizontal">
          <HeadingGroup>
            <Heading as="h1">Booking #{id}</Heading>
            <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
          </HeadingGroup>
          <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
        </Row>

        <BookingDataBox booking={booking} />

        <ButtonGroup>
          {status === "unconfirmed" && (
            <Button
              icon={<HiArrowDownOnSquare />}
              onClick={() => navigate(`/checkin/${id}`)}
            >
              Check in
            </Button>
          )}
          {status === "checked-in" && (
            <Button
              icon={<HiArrowUpOnSquare />}
              onClick={() => checkOutBooking(id)}
              disabled={isCheckingOut}
            >
              Check out
            </Button>
          )}
          {status === "checked-out" && (
            <Modal.Open opens="deleteBooking">
              <Button icon={<HiOutlineTrash />}>Delete Booking</Button>
            </Modal.Open>
          )}
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
        <Modal.Window name="deleteBooking">
          <ConfirmDelete
            resourceName="booking"
            onConfirm={() =>
              deleteBooking(id, {
                onSuccess: () => navigate("/bookings"),
              })
            }
            disabled={isDeletingBooking}
          />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default BookingDetail;
