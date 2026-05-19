export interface Adaptor<I,O> {

    adapt(data: I): O;
}
