import { ButtonStateHandlerProps } from "@/app/_types/common/ButtonStateHandler"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

const TermsContent: React.FC<ButtonStateHandlerProps> = ({ setIsButtonEnabled }) => {
    // Use Intersection Observer to track when the bottom element comes into view
    const { ref, inView } = useInView({
        threshold: 1.0, // Trigger when the element is fully visible
    })

    // Update button state when inView changes
    useEffect(() => {
        setIsButtonEnabled(inView)
    }, [inView])
    return (
        <div className="modal-body pt-0 pb-15 px-5 px-xl-20">
            <div className="mb-13 text-center">
                <h1 className="mb-3">Terms & Conditions</h1>
                <div className="text-muted fw-semibold fs-5">Please review in full before continuing sign up.</div>
            </div>
            <div id="scrollable-div" className="bg-secondary py-10 px-5" style={{ height: "300px", overflowY: "scroll" }}>
                <ol>
                    <li>
                        <h2>Introduction</h2>
                        <p>
                            Welcome to TritonLake. These Terms and Conditions (&quot;Terms&quot;) govern your use of our website, products, and services (&quot;Services&quot;). By accessing or using
                            our Services, you agree to be bound by these Terms. If you do not agree with any part of these Terms, please do not use our Services.
                        </p>
                    </li>
                    <li>
                        <h2>Definitions</h2>
                        <p>
                            &quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot; refers to TritonLake.
                            <br />
                            &quot;You&quot;, &quot;your&quot; refers to the individual or entity using our Services.
                            <br />
                            &quot;Services&quot; refers to the services and products provided by TritonLake.
                        </p>
                    </li>
                    <li>
                        <h2>Eligibility</h2>
                        <p>
                            By using our Services, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into these Terms. If you are using our Services on
                            behalf of an entity, you further represent and warrant that you are authorized to bind that entity to these Terms.
                        </p>
                    </li>
                    <li>
                        <h2>Use of Services</h2>
                        <p>You agree to use our Services only for lawful purposes and in accordance with these Terms. You agree not to:</p>
                        <p>
                            Use our Services in any way that violates any applicable federal, state, local, or international law or regulation.
                            <br />
                            Engage in any conduct that restricts or inhibits anyone&apos;s use or enjoyment of our Services, or which, as determined by us, may harm TritonLake or users of our
                            Services.
                            <br />
                            Use any device, software, or routine that interferes with the proper working of our Services.
                        </p>
                    </li>
                    <li>
                        <h2>Account Registration</h2>
                        <p>To access certain features of our Services, you may be required to register for an account. You agree to:</p>
                        <p>
                            Provide accurate, current, and complete information during the registration process.
                            <br />
                            Maintain and promptly update your account information to keep it accurate, current, and complete.
                            <br />
                            Maintain the security of your account and accept all risks of unauthorized access to your account.
                        </p>
                    </li>
                    <li>
                        <h2>Intellectual Property</h2>
                        <p>
                            All content and materials included in our Services, such as text, graphics, logos, images, and software, are the property of TritonLake or its content suppliers and are
                            protected by intellectual property laws. You agree not to:
                        </p>
                        <p>
                            Reproduce, distribute, or create derivative works based on our content without our express written permission.
                            <br />
                            Remove, alter, or obscure any copyright, trademark, or other proprietary rights notices.
                        </p>
                    </li>
                    <li>
                        <h2>Termination</h2>
                        <p>
                            We reserve the right to terminate or suspend your access to our Services, without prior notice or liability, for any reason whatsoever, including, without limitation, if
                            you breach these Terms.
                        </p>
                    </li>
                    <li>
                        <h2>Disclaimer of Warranties</h2>
                        <p>
                            Our Services are provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied, including, but not limited to, implied
                            warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that:
                        </p>
                        <p>
                            Our Services will be uninterrupted, secure, or error-free.
                            <br />
                            The results that may be obtained from the use of our Services will be accurate or reliable.
                        </p>
                    </li>
                    <li>
                        <h2>Limitation of Liability</h2>
                        <p>
                            To the fullest extent permitted by applicable law, TritonLake shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including
                            without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                        </p>
                        <p>
                            Your use or inability to use our Services.
                            <br />
                            Any unauthorized access to or use of our servers and/or any personal information stored therein.
                            <br />
                            Any interruption or cessation of transmission to or from our Services.
                        </p>
                    </li>
                    <li>
                        <h2>Indemnification</h2>
                        <p>
                            You agree to defend, indemnify, and hold harmless TritonLake, its affiliates, and their respective officers, directors, employees, agents, and representatives from and
                            against any and all claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including but not limited to attorney&apos;s fees) arising from:
                        </p>
                        <p>
                            Your use of and access to our Services.
                            <br />
                            Your violation of any term of these Terms.
                            <br />
                            Your violation of any third-party right, including without limitation any copyright, property, or privacy right.
                        </p>
                    </li>
                    <li>
                        <h2>Governing Law</h2>
                        <p>
                            These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which TritonLake is headquartered, without regard to its conflict of law
                            provisions.
                        </p>
                    </li>
                    <li>
                        <h2>Changes to Terms</h2>
                        <p>
                            We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days&apos; notice prior to any new terms taking
                            effect. By continuing to access or use our Services after those revisions become effective, you agree to be bound by the revised terms.
                        </p>
                    </li>
                    <li>
                        <h2 ref={ref}>Contact Us</h2>
                        <p>If you have any questions about these Terms, please contact us at: TritonLake</p>
                    </li>
                </ol>
            </div>
        </div>
    )
}

export default TermsContent
