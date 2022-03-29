import React from 'react';
import '../App.css';
import {
    Text,
    Button,
    Layout,
    Breadcrumb,
    BoxContainer,
    InputSelect,
    Modal
} from 'react-lifesg-design-system';
import styled from "styled-components";

import Booking from "../models/booking";
import Queue from "../models/queue";


import { ModalContent } from "../models/doc-elements";
import BaseService from '../service/base.service';



const StyledSection = styled(Layout.Section)`
    margin-top: 8%;
    min-height: 600px;
`;

interface MyState {
    bookings: Booking[],
    _bookingId: string,
    nric: string,
    citizenName: string,
    citizenNumber: string,
    citizenEmail: string,
    inputValue: string,
    queueNumber: string,
    showModal: boolean,
    citizenSalutation: string,
    generalType: string,
    serviceName: string,
    serviceProviderEmail: string,
    serviceProviderName: string,
    serviceStartDate: string,
    serviceProviderPhone: string,
    serviceStartTime: string,
    serviceProviderLocation: string,
    bookingStatus: string,
    queueName: string,
    elementNobodyInQueue: string,
    showCurrentCitizen: string,
    showDivHPBService: string,
    showDIVHospitalservice: string,
    agencySelection: string,
    serviceSelection: string,
    routingKey: string,
    showButtonNextNumber: string,
    showNextServiceHospitalDoctor: string,
    showNextServiceHospitalPharmacy: string,
    showNextServiceHospitalPayment: string,
    showNextServiceHPB: string,
    nextServiceSelection: string,
    queue: Queue

}



class ServiceCounter extends React.Component<{}, MyState> {
    constructor(props) {
        super(props);
        this.state = {
            bookings: [],
            _bookingId: "",
            nric: "",
            citizenName: "",
            citizenNumber: "",
            citizenEmail: "",
            inputValue: "",
            queueNumber: "",
            showModal: false,
            citizenSalutation: "",
            generalType: "",
            serviceName: "",
            serviceProviderEmail: "",
            serviceProviderName: "",
            serviceStartDate: "",
            serviceProviderPhone: "",
            serviceStartTime: "",
            serviceProviderLocation: "",
            bookingStatus: "",
            queueName: "communityHealthQueue",
            elementNobodyInQueue: "none",
            showCurrentCitizen: "none",
            showDivHPBService: "block",
            showDIVHospitalservice: "none",
            agencySelection: "HPB",
            serviceSelection: "communityHealth",
            routingKey: "sgh.doctor",
            showButtonNextNumber: "block",
            showNextServiceHospitalDoctor: "block",
            showNextServiceHospitalPharmacy: "block",
            showNextServiceHospitalPayment: "block",
            showNextServiceHPB: "none",
            nextServiceSelection: "",
            queue: {
                Id: '',
                QueueNumber: '',
                AppointmentId: '',
                QueueDate: '',
                CurrentService: '',
                MissedQueue: false
            }
        };

        this.consumeQueue = this.consumeQueue.bind(this)

    }

    componentDidMount() {
        this.loadData();

    }

    async loadData() {
        try {

            var apiURL: string
            apiURL = process.env.REACT_APP_APPOINTMENT_API_ADDRESS + 'api/booking/location/Tampines';

            fetch(apiURL)
                .then(function (response) {

                    return response.json();
                })
                .then((myJson) => {
                    this.setState({
                        bookings: []
                    })
                    console.log(myJson)
                    myJson.data.forEach(element => {

                        if (element["bookingStatus"] == this.state.serviceSelection + "-Calling") {
                            console.log("have")
                            var eachBooking = new Booking(
                                element["_id"],
                                element["nric"],
                                element["citizenName"],
                                element["citizenSalutation"],
                                element["citizenEmail"],
                                element["citizenNumber"],
                                element["generalType"],
                                element["serviceName"],
                                element["serviceProviderName"],
                                element["serviceProviderEmail"],
                                element["serviceProviderPhone"],
                                element["serviceStartDate"],
                                element["serviceStartTime"],
                                element["serviceProviderLocation"],
                                element["bookingStatus"],
                            );

                            this.state.bookings.push(eachBooking)

                        }

                        this.setState({
                            bookings: this.state.bookings,
                        });

                        if (this.state.bookings.length > 0) {

                            console.log("hello testing here")
                            this.setState({
                                showCurrentCitizen: "block",
                                showButtonNextNumber: "none",

                                nric: this.state.bookings[0].Nric,
                                citizenName: this.state.bookings[0].CitizenName,
                                citizenNumber: this.state.bookings[0].CitizenNumber,
                                citizenEmail: this.state.bookings[0].CitizenEmail,
                                citizenSalutation: this.state.bookings[0].CitizenSalutation,
                                _bookingId: this.state.bookings[0].Id?.toString() || '',
                                generalType: this.state.bookings[0].GeneralType,
                                serviceName: this.state.bookings[0].ServiceName,
                                serviceProviderName: this.state.bookings[0].ServiceProviderName,
                                serviceProviderEmail: this.state.bookings[0].ServiceProviderEmail,
                                serviceProviderPhone: this.state.bookings[0].ServiceProviderPhone,
                                serviceStartDate: this.state.bookings[0].ServiceStartDate,
                                serviceStartTime: this.state.bookings[0].ServiceStartTime,
                                serviceProviderLocation: this.state.bookings[0].ServiceProviderLocation,
                                bookingStatus: this.state.bookings[0].BookingStatus,

                            })

                            console.log("testing here!!! : " + this.state.bookings[0].Id)


                            if (this.state.agencySelection == "HPB") {
                                this.setState({
                                    showNextServiceHospitalDoctor: "none",
                                    showNextServiceHospitalPharmacy: "none",
                                    showNextServiceHospitalPayment: "none",
                                    showNextServiceHPB: "block"
                                })
                            }
                            else {
                                this.setState({
                                    showNextServiceHospitalDoctor: "none",
                                    showNextServiceHospitalPharmacy: "none",
                                    showNextServiceHospitalPayment: "none",
                                    showNextServiceHPB: "none"
                                })

                                if(this.state.serviceSelection == "Doctor"){
                                    this.setState({
                                        showNextServiceHospitalDoctor: "block",
                                        showNextServiceHospitalPharmacy: "none",
                                        showNextServiceHospitalPayment: "none",
                                        showNextServiceHPB: "none"
                                    })
                                }

                                else if(this.state.serviceSelection == "Payment"){
                                    this.setState({
                                        showNextServiceHospitalDoctor: "none",
                                        showNextServiceHospitalPharmacy: "none",
                                        showNextServiceHospitalPayment: "block",
                                        showNextServiceHPB: "none"
                                    })
                                }

                                else{
                                    this.setState({
                                        showNextServiceHospitalDoctor: "none",
                                        showNextServiceHospitalPharmacy: "block",
                                        showNextServiceHospitalPayment: "none",
                                        showNextServiceHPB: "none"
                                    })
                                }
                            }
                        }
                        else {
                            this.setState({
                                showCurrentCitizen: "none",
                                showButtonNextNumber: "block",
                            })
                        }
                    });
                });

        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <StyledSection>

                <Modal.Base
                    show={this.state.showModal}
                    animationFrom="bottom"
                    enableOverlayClick={true}
                >
                    <Modal.Box onClose={() => {
                        this.setState({
                            showModal: false
                        });
                    }}>
                        <ModalContent>
                            <span>Send to queue succesfully</span>
                        </ModalContent>
                    </Modal.Box>
                </Modal.Base>
                <Layout.Container>


                    <Breadcrumb links={[{ title: 'Home', url: 'http://localhost:3000/ServiceCounter' }, { title: 'Service Counter' }]} />

                    Agency:
                    <div id='divAgency' className="inlinecontent" style={{ justifyItems: "start", maxWidth: '400px' }}>
                        <InputSelect
                            options={[
                                { value: "HPB", label: "HPB" },
                                { value: "Hospital", label: "Hospital" },

                            ]}

                            valueExtractor={(item) => item.value}
                            listExtractor={(item) => item.label}

                            displayValueExtractor={(item) => item.label}
                            placeholder={this.state.agencySelection}
                            onSelectItem={(item, selectedValue) => {
                                this.setState({ inputValue: selectedValue }, () => {
                                    this.ddlAgency(selectedValue)

                                });
                            }} />

                    </div>



                    <br />

                    Service:

                    <div id='divHPBService' className="inlinecontent" style={{ justifyItems: "start", maxWidth: '400px', display: this.state.showDivHPBService }}>
                        <InputSelect
                            options={[
                                { value: "communityHealth", label: "communityHealth" },
                                { value: "workplaceHealth", label: "workplaceHealth" },

                            ]}

                            valueExtractor={(item) => item.value}
                            listExtractor={(item) => item.label}

                            displayValueExtractor={(item) => item.label}
                            placeholder={this.state.serviceSelection}
                            onSelectItem={(item, selectedValue) => {
                                this.setState({ inputValue: selectedValue }, () => {
                                    this.ddlService(selectedValue)

                                });
                            }} />

                    </div>

                    <div id='divHospitalService' className="inlinecontent" style={{ justifyItems: "start", maxWidth: '400px', display: this.state.showDIVHospitalservice }}>
                        <InputSelect
                            options={[
                                { value: "Doctor", label: "Doctor" },
                                { value: "Payment", label: "Payment" },
                                { value: "Pharmacy", label: "Pharmacy" }

                            ]}

                            valueExtractor={(item) => item.value}
                            listExtractor={(item) => item.label}

                            displayValueExtractor={(item) => item.label}
                            placeholder={this.state.serviceSelection}
                            onSelectItem={(item, selectedValue) => {
                                this.setState({ inputValue: selectedValue }, () => {
                                    this.ddlService(selectedValue)

                                });
                            }} />

                    </div>

                    <br></br>

                    Your are selecting agency: <b>{this.state.agencySelection},</b> and service as <b>{this.state.serviceSelection}</b>

                    <br /><br />
                    <div id='divButtonNextPatient' style={{ display: this.state.showButtonNextNumber }}>


                        <Button.Default className='buttonsuccess'
                            onClick={() => this.consumeQueue(this.handle200, "nextPatient")}
                        >Next Number</Button.Default>
                        <p style={{ 'color': "green", 'fontSize': 30, 'display': this.state.elementNobodyInQueue }}>There is no one in the queue😄</p>
                    </div>
                    <div id='divCurrentCitizen' style={{ display: this.state.showCurrentCitizen }}>

                        <Layout.GridContainer className="column2">
                            <div>
                                <div className='spacer1'></div>

                                <Text.H3>Currently Serving</Text.H3>

                                <div className='spacer1'></div>
                                <div className='spacer1'></div>

                                <BoxContainer title="Citizen Information" collapsible={false} className="textleft" >
                                    <div style={{ padding: "2rem", minWidth: "1080px" }}>
                                        <Layout.GridContainer className="column4">
                                            <Text.Body weight="semibold">NRIC</Text.Body>
                                            <Text.Body weight="semibold">Name</Text.Body>
                                            <Text.Body weight="semibold">Phone Number</Text.Body>
                                            <Text.Body weight="semibold">Email</Text.Body>
                                            <Text.Body>{this.state.nric}</Text.Body>
                                            <Text.Body>{this.state.citizenName}</Text.Body>
                                            <Text.Body>{this.state.citizenNumber}</Text.Body>
                                            <Text.Body>{this.state.citizenEmail}</Text.Body>
                                        </Layout.GridContainer>
                                    </div>
                                </BoxContainer>


                                <Text.Body>Next service: </Text.Body>


                            </div>

                        </Layout.GridContainer>

                        <div style={{ display: this.state.showNextServiceHPB }}>
                            <Layout.GridContainer className="column4">

                                <InputSelect
                                    placeholder="Select"
                                    options={[
                                        { value: "Doctor", label: "Doctor" },
                                        { value: "Missed Queue", label: "Missed Queue" }

                                    ]}
                                    valueExtractor={(item) => item.value}
                                    listExtractor={(item) => item.label}
                                    displayValueExtractor={(item) => item.label}
                                    onSelectItem={(item, selectedValue) => {

                                        if (selectedValue != "Missed Queue") {
                                            this.setState({
                                                routingKey: "sgh.doctor"
                                            })
                                        }

                                        this.setState({
                                            nextServiceSelection: selectedValue,
                                        })


                                    }}
                                />
                            </Layout.GridContainer>

                        </div>

                        <div style={{ display: this.state.showNextServiceHospitalDoctor }}>
                            <Layout.GridContainer className="column4">

                                <InputSelect
                                    placeholder="Select"
                                    options={[
                                        { value: "Payment", label: "Payment" },
                                        { value: "Pharmacy", label: "Pharmacy" },
                                        { value: "Missed Queue", label: "Missed Queue" }

                                    ]}
                                    valueExtractor={(item) => item.value}
                                    listExtractor={(item) => item.label}
                                    displayValueExtractor={(item) => item.label}
                                    onSelectItem={(item, selectedValue) => {
                                        if (selectedValue == "Payment") {
                                            this.setState({
                                                routingKey: "sgh.payment"
                                            })
                                        }
                                        else if (selectedValue == "Pharmacy") {
                                            this.setState({
                                                routingKey: "sgh.pharmacy"
                                            })
                                        }
                                        else {
                                            this.getQueue(this.state._bookingId, selectedValue, true);
                                        }
                                        this.setState({
                                            nextServiceSelection: selectedValue,
                                        })
                                    }}
                                />
                            </Layout.GridContainer>

                        </div>


                        <div style={{ display: this.state.showNextServiceHospitalPayment }}>
                            <Layout.GridContainer className="column4">

                                <InputSelect
                                    placeholder="Select"
                                    options={[
                                        { value: "Pharmacy", label: "Pharmacy" },
                                        { value: "Missed Queue", label: "Missed Queue" }

                                    ]}
                                    valueExtractor={(item) => item.value}
                                    listExtractor={(item) => item.label}
                                    displayValueExtractor={(item) => item.label}
                                    onSelectItem={(item, selectedValue) => {
                                        if (selectedValue == "Pharmacy") {
                                            this.setState({
                                                routingKey: "sgh.pharmacy"
                                            })
                                        }
                                        else {
                                            this.getQueue(this.state._bookingId, selectedValue, true);
                                        }
                                        this.setState({
                                            nextServiceSelection: selectedValue,
                                        })
                                    }}
                                />
                            </Layout.GridContainer>

                        </div>


                        <div style={{ display: this.state.showNextServiceHospitalPharmacy }}>
                            <Layout.GridContainer className="column4">

                                <InputSelect
                                    placeholder="Select"
                                    options={[
                                        { value: "Completed", label: "Completed" },
                                        { value: "Missed Queue", label: "Missed Queue" }

                                    ]}
                                    valueExtractor={(item) => item.value}
                                    listExtractor={(item) => item.label}
                                    displayValueExtractor={(item) => item.label}
                                    onSelectItem={(item, selectedValue) => {
                                        if (selectedValue == "Missed Queue") {
                                            this.getQueue(this.state._bookingId, selectedValue, true);
                                        }
                                        else{
                                            this.getQueue(this.state._bookingId, selectedValue, false);
                                        }

                                        this.setState({
                                            nextServiceSelection: selectedValue,
                                        })
                                    }}
                                />
                            </Layout.GridContainer>

                        </div>

                        <div className='spacer1'></div>


                        <Button.Default
                            onClick={() => this.consumeQueue(this.handle200, "sendtoNextService",
                                this.state._bookingId,
                                this.state.nric,
                                this.state.citizenName,
                                this.state.citizenSalutation,
                                this.state.citizenEmail,
                                this.state.citizenNumber,
                                this.state.generalType,
                                this.state.serviceName,
                                this.state.serviceProviderName,
                                this.state.serviceProviderEmail,
                                this.state.serviceProviderPhone,
                                this.state.serviceStartDate,
                                this.state.serviceStartTime,
                                this.state.serviceProviderLocation,
                                this.state.bookingStatus



                            )}

                        >Send to next service</Button.Default>

                    </div>

                </Layout.Container>
            </StyledSection>
        )
    }
    ddlAgency(selectedValue: any) {
        if (selectedValue == "HPB") {
            this.setState({
                showCurrentCitizen: "none",
                showDivHPBService: "block",
                showDIVHospitalservice: "none",
                agencySelection: "HPB",
                serviceSelection: "communityHealth"
            })

            this.loadData();

        }
        else {
            this.setState({
                showCurrentCitizen: "none",
                showDivHPBService: "none",
                showDIVHospitalservice: "block",
                agencySelection: "Hospital",
                serviceSelection: "Doctor"

            })
            this.loadData();

        }
    }

    ddlService(selectedValue: any) {
        if (selectedValue == "communityHealth") {
            this.setState({
                showCurrentCitizen: "none",
                showDivHPBService: "block",
                showDIVHospitalservice: "none",
                serviceSelection: "communityHealth",
                queueName: "communityHealthQueue",
            })

            this.loadData()
        }
        else if (selectedValue == "workplaceHealth") {
            this.setState({
                showCurrentCitizen: "none",
                showDivHPBService: "block",
                showDIVHospitalservice: "none",
                serviceSelection: "workplaceHealth",
                queueName: "workplaceHealthQueue",

            })
            this.loadData()

        }
        else if (selectedValue == "Doctor") {
            this.setState({
                showCurrentCitizen: "none",
                showDivHPBService: "none",
                showDIVHospitalservice: "block",
                serviceSelection: "Doctor",
                queueName: "doctorQueue",
            })
            this.loadData()

        }
        else if (selectedValue == "Payment") {
            this.setState({
                showCurrentCitizen: "none",
                showDivHPBService: "none",
                showDIVHospitalservice: "block",
                serviceSelection: "Payment",
                queueName: "paymentQueue",

            })
            this.loadData()

        }
        else if (selectedValue == "Pharmacy") {
            this.setState({
                showCurrentCitizen: "none",
                showDivHPBService: "none",
                showDIVHospitalservice: "block",
                serviceSelection: "Pharmacy",
                queueName: "pharmacyQueue",

            })
            this.loadData()

        }
    }


    handle200(response) {
        console.log('handle200 has received:', response);
    }


    async getQueue(appointmentId: string, calledService: string, missedQueueSend: boolean) {
        try {
            var apiURL: string

            apiURL = process.env.REACT_APP_QUEUE_API_ADDRESS + 'api/queue/appointment/' + appointmentId;
            console.log(apiURL);
            fetch(apiURL)
                .then(function (response) {

                    return response.json();
                })
                .then((myJson) => {

                    console.log("this myJson is" + myJson.data[0])
                    this.setState({
                        queue: {
                            Id: myJson.data[0]["_id"],
                            QueueNumber: myJson.data[0]["queueNumber"],
                            AppointmentId: myJson.data[0]["appointmentId"],
                            QueueDate: myJson.data[0]["queueDate"],
                            CurrentService: myJson.data[0]["currentService"],
                            MissedQueue: myJson.data[0]["missedQueue"]
                        }
                    })

                    var calledQueue: Queue;
                    if (missedQueueSend == true) {
                        calledQueue = new Queue(this.state.queue.Id!!, this.state.queue.QueueNumber, this.state.queue.AppointmentId, this.state.queue.QueueDate, calledService, true);
                    }
                    else {
                        calledQueue = new Queue(this.state.queue.Id!!, this.state.queue.QueueNumber, this.state.queue.AppointmentId, this.state.queue.QueueDate, calledService, false);
                    }


                    BaseService.update<Queue>(process.env.REACT_APP_QUEUE_API_ADDRESS + "api/queue/update/", this.state.queue.Id, calledQueue).then(

                        (rp) => {
                            if (rp.Status) {
                                console.log('Queue updated.');
                            } else {
                                console.log(rp.Messages);
                                console.log("Messages: " + rp.Messages);
                                console.log("Exception: " + rp.Exception);
                            }
                        }
                    );



                    // console.log(this.state.queue)

                });


        } catch (e) {
            console.log(e);
        }
    }





    




    consumeQueue(callback, buttonSelected: string,
        bookingId?: string,
        nric?: string,
        citizenName?: string,
        citizenSalutation?: string,
        citizenEmail?: string,
        citizenNumber?: string,
        generalType?: string,
        serviceName?: string,
        serviceProviderName?: string,
        serviceProviderEmail?: string,
        serviceProviderPhone?: string,
        serviceStartDate?: string,
        serviceStartTime?: string,
        serviceProviderLocation?: string,
        bookingStatus?: string,

    ) {

        var respectiveURL = ""
        if (buttonSelected == "nextPatient") {

            respectiveURL = "https://hyxfimzf9g.execute-api.us-east-1.amazonaws.com/default/receiver?queueName=" + this.state.queueName

        }
        if (buttonSelected == "sendtoNextService") {

            if(this.state.nextServiceSelection == "Missed"){
                toastr.success('Saved successfully.'); 
                this.setState({
                    showCurrentCitizen: "none",
                    showNextServiceHPB: "none",
                    showButtonNextNumber: "block",
                    showDivHPBService: "none",
                    showNextServiceHospitalDoctor: "none",
                    showNextServiceHospitalPayment: "none",
                    showNextServiceHospitalPharmacy: "none",
                    showDIVHospitalservice: "block",
                
                    
                })
                return; 
            }

            if(this.state.nextServiceSelection == "Completed"){
                toastr.success('Save successfully.'); 
                this.setState({
                    showCurrentCitizen: "none",
                    showNextServiceHPB: "none",
                    showButtonNextNumber: "block",
                    showDivHPBService: "none",
                    showNextServiceHospitalDoctor: "none",
                    showNextServiceHospitalPayment: "none",
                    showNextServiceHospitalPharmacy: "none",
                    showDIVHospitalservice: "block",
                
                    
                })
                return;
            }

            const queueObject = {
                "_id": bookingId,
                "nric": nric,
                "citizenName": citizenName,
                "citizenSalutation": citizenSalutation,
                "citizenEmail": citizenEmail,
                "citizenNumber": citizenNumber,

                "generalType": generalType,
                "serviceName": serviceName,
                "serviceProviderName": serviceProviderName,
                "serviceProviderEmail": serviceProviderEmail,
                "serviceProviderPhone": serviceProviderPhone,
                "serviceStartDate": serviceStartDate,
                "serviceStartTime": serviceStartTime,
                "serviceProviderLocation": serviceProviderLocation,
                "bookingStatus": bookingStatus,

            }

            console.log(queueObject)

            var myJSON = encodeURI(JSON.stringify(queueObject));
            respectiveURL = "https://hyxfimzf9g.execute-api.us-east-1.amazonaws.com/default/sender?bookingID=" + bookingId!!.toString() + "&exchangeID=master&bindingKey=" + this.state.routingKey + "&bookingDetails=" + myJSON;
            console.log("testing payment: " + respectiveURL)
        }




        const xhr = new XMLHttpRequest(),
            method = "GET",
            url = respectiveURL;
        // initialize a new GET request
        xhr.open(method, url, true);

        // respond to every readyState change
        xhr.onreadystatechange = () => {
            // ignore all readyStates other than "DONE"
            if (xhr.readyState !== XMLHttpRequest.DONE) {
                return;
            }

            // call the callback with status
            if (xhr.status === 200) {
                console.log(xhr.responseText)
                if(xhr.responseText == "fk you jiawei"){
                    this.setState({
                        elementNobodyInQueue: "block"
                    })
                    return;
                }
                var calledBooking: Booking;
                if (buttonSelected == "nextPatient") {
                    this.setState({
                        _bookingId: JSON.parse(xhr.responseText)._id,
                        nric: JSON.parse(xhr.responseText).nric,
                        citizenName: JSON.parse(xhr.responseText).citizenName,
                        citizenEmail: JSON.parse(xhr.responseText).citizenEmail,
                        citizenNumber: JSON.parse(xhr.responseText).citizenNumber,
                        citizenSalutation: JSON.parse(xhr.responseText).citizenSalutation,
                        queueNumber: JSON.parse(xhr.responseText).queueNumber,
                        generalType: JSON.parse(xhr.responseText).generalType,

                        serviceName: JSON.parse(xhr.responseText).serviceName,

                        serviceProviderEmail: JSON.parse(xhr.responseText).serviceProviderEmail,
                        serviceProviderName: JSON.parse(xhr.responseText).serviceProviderName,
                        serviceStartDate: JSON.parse(xhr.responseText).serviceStartDate,
                        serviceProviderPhone: JSON.parse(xhr.responseText).serviceProviderPhone,
                        serviceStartTime: JSON.parse(xhr.responseText).serviceStartTime,
                        serviceProviderLocation: JSON.parse(xhr.responseText).serviceProviderLocation,
                        bookingStatus: JSON.parse(xhr.responseText).bookingStatus,
                        elementNobodyInQueue: "none",
                        showCurrentCitizen: "block"
                    })

                    if (this.state.agencySelection == "HPB") {
                        this.setState({
                            showNextServiceHospitalDoctor: "none",
                            showNextServiceHospitalPharmacy: "none",
                            showNextServiceHospitalPayment: "none",
                            showNextServiceHPB: "block"
                        })
                    }
                    else {
                        this.setState({
                            showNextServiceHospitalDoctor: "none",
                            showNextServiceHospitalPharmacy: "none",
                            showNextServiceHospitalPayment: "none",
                            showNextServiceHPB: "none"
                        })

                        if(this.state.serviceSelection == "Doctor"){
                            this.setState({
                                showNextServiceHospitalDoctor: "block",
                                showNextServiceHospitalPharmacy: "none",
                                showNextServiceHospitalPayment: "none",
                                showNextServiceHPB: "none"
                            })
                        }

                        else if(this.state.serviceSelection == "Payment"){
                            this.setState({
                                showNextServiceHospitalDoctor: "none",
                                showNextServiceHospitalPharmacy: "none",
                                showNextServiceHospitalPayment: "block",
                                showNextServiceHPB: "none"
                            })
                        }

                        else{
                            this.setState({
                                showNextServiceHospitalDoctor: "none",
                                showNextServiceHospitalPharmacy: "block",
                                showNextServiceHospitalPayment: "none",
                                showNextServiceHPB: "none"
                            })
                        }
                    }

                    calledBooking = new Booking(this.state._bookingId, this.state.nric, this.state.citizenName, this.state.citizenSalutation, this.state.citizenEmail, this.state.citizenNumber, this.state.generalType, this.state.serviceName, this.state.serviceProviderName, this.state.serviceProviderEmail, this.state.serviceProviderPhone, this.state.serviceStartDate, this.state.serviceStartTime, this.state.serviceProviderLocation, this.state.bookingStatus);

                    document.getElementById("divCurrentCitizen")!!.style.display = "block";
                    document.getElementById("divButtonNextPatient")!!.style.display = "none";
                    calledBooking.BookingStatus = this.state.serviceSelection + "-Calling"

                    this.getQueue(calledBooking.Id!!, this.state.serviceSelection + "-Calling", false);


                    BaseService.update<Booking>(process.env.REACT_APP_APPOINTMENT_API_ADDRESS + "api/booking/update/", this.state._bookingId, calledBooking).then(

                        (rp) => {
                            if (rp.Status) {
                                console.log('Booking saved.');
                            } else {
                                console.log(rp.Messages);
                                console.log("Messages: " + rp.Messages);
                                console.log("Exception: " + rp.Exception);
                            }
                        }
                    );



                }

                if (buttonSelected == "sendtoNextService") {
                    this.setState({
                        showModal: true
                    });

                    calledBooking = new Booking(this.state._bookingId, this.state.nric, this.state.citizenName, this.state.citizenSalutation, this.state.citizenEmail, this.state.citizenNumber, this.state.generalType, this.state.serviceName, this.state.serviceProviderName, this.state.serviceProviderEmail, this.state.serviceProviderPhone, this.state.serviceStartDate, this.state.serviceStartTime, this.state.serviceProviderLocation, this.state.bookingStatus);


                    document.getElementById("divCurrentCitizen")!!.style.display = "none";
                    document.getElementById("divButtonNextPatient")!!.style.display = "block";



                    console.log(this.state)

                    if (this.state.nextServiceSelection == "Missed Queue") {
                        this.getQueue(calledBooking.Id!!, this.state.serviceSelection + "-Missed", true);
                        calledBooking.BookingStatus = this.state.serviceSelection + "-Missed"

                    }
                    else {
                        this.getQueue(calledBooking.Id!!, this.state.serviceSelection + "-Queued", false);
                        calledBooking.BookingStatus = this.state.serviceSelection + "-Queued"

                    }


                    BaseService.update<Booking>(process.env.REACT_APP_APPOINTMENT_API_ADDRESS + "api/booking/update/", this.state._bookingId, calledBooking).then(

                        (rp) => {
                            if (rp.Status) {
                                console.log('Booking saved.');
                            } else {
                                console.log(rp.Messages);
                                console.log("Messages: " + rp.Messages);
                                console.log("Exception: " + rp.Exception);
                            }
                        }
                    );

                }



                // console.log(JSON.parse(xhr.responseText));

                return callback(xhr.status);
            }

            // got something other than 200,
            // re-initialize and send another GET request
            xhr.open(method, url, true);
            xhr.send();
        }

        // send the initial GET request
        xhr.send();
    }


}

export default ServiceCounter;
