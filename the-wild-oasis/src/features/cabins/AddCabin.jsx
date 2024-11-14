import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
// function AddCabin() {
//   const [isOpenModel, setIsOpenModel] = useState(false);
//   return (
//     <>
//       <Button onClick={() => setIsOpenModel(!isOpenModel)}>Add Cabin</Button>
//       {isOpenModel && (
//         <Modal onClose={() => setIsOpenModel(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModel(false)} />
//         </Modal>
//       )}
//     </>
//   );
// }

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button> Add new cabin </Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
export default AddCabin;
