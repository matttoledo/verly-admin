import { AddEdit } from '../../../components/customers';
import { customerService } from '../../../services';

export default AddEdit;

export async function getServerSideProps({ params }) {
    const customer = await customerService.getById(params.id);

    return {
        props: { customer }
    }
}