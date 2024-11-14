import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";

import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";
import { useEffect, useState } from "react";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSetting";

import { format } from "date-fns";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPayment, setConfirmPayment] = useState();
  const [addBreakfast, setAddBreakfast] = useState(false);
  const moveBack = useMoveBack();
  const { isLoading: isGettingSettings, settings } = useSettings();
  const { isLoading, booking } = useBooking();
  const { isCheckingIn, checkInBooking } = useCheckin();
  const { breakfastPrice } = settings || {};
  useEffect(() => {
    setConfirmPayment(booking?.isPaid || false);
  }, [booking]);
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking || {};
  const optinalBreakfastPrice = breakfastPrice * numNights * numGuests;
  function handleCheckin() {
    if (!confirmPayment) return;
    if (addBreakfast)
      checkInBooking({
        bookingId,
        options: {
          hasBreakfast: true,
          totalPrice: totalPrice + optinalBreakfastPrice,
          extrasPrice: optinalBreakfastPrice,
        },
      });
    else
      checkInBooking({
        bookingId,
        options: {},
      });
  }
  if (isLoading || isCheckingIn || isGettingSettings) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPayment(false);
            }}
            disabled={isCheckingIn || isGettingSettings}
          >
            Want to add breakfast for {formatCurrency(optinalBreakfastPrice)} ?
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          id="checkin"
          checked={confirmPayment}
          onChange={() => setConfirmPayment((confirm) => !confirm)}
          disabled={confirmPayment || isCheckingIn}
        >
          I confirm that the {guests.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optinalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optinalBreakfastPrice
              )})`}
          .
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={!confirmPayment || isCheckingIn}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
