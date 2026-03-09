import { useState } from "react";
import savedApiService from "../../../shared/services/savedApi.service";

export const FormBlock = {
    fields: {
        savedApiId: { type: "text", label: "Saved API ID (POST — leave empty for static form)" },
        successMessage: { type: "text", label: "Success message" },
        backgroundColor: { type: "text" },
        padding: { type: "text" },
        children: {
            type: "slot",
            allow: ["Input", "Textarea", "Select", "Checkbox", "Radio", "SubmitButton", "Heading1", "Heading2", "Heading3", "Heading4", "Heading5", "Heading6", "Paragraph", "Span", "Spacer", "Divider", "DynamicTable"],
        },
        margin: { type: "text" },
        borderRadius: { type: "text" },
        width: { type: "text" },
        height: { type: "text" },
    },

    defaultProps: {
        savedApiId: "",
        successMessage: "Submitted successfully!",
        backgroundColor: "#ffffff",
        padding: "24px",
        margin: "0px",
        borderRadius: "8px",
        width: "auto",
        height: "auto",
    },

    render: (props: any) => {
        const { backgroundColor, padding, children: Children } = props;
        const [submitting, setSubmitting] = useState(false);
        const [submitted, setSubmitted] = useState(false);
        const [error, setError] = useState<string | null>(null);

        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (!props.savedApiId) return;

            setSubmitting(true);
            setError(null);

            const form = e.currentTarget;

            try {
                // Gather all form data from the native form
                const formData = new FormData(form);
                const payload: Record<string, any> = {};
                formData.forEach((value, key) => {
                    payload[key] = value;
                });

                // Also gather from inputs/textareas/selects that might not have name attrs
                const inputs = form.querySelectorAll("input, textarea, select");
                inputs.forEach((el: any) => {
                    const name = el.name || el.placeholder || el.type;
                    if (el.type === "checkbox") {
                        payload[name] = el.checked;
                    } else if (el.type === "radio") {
                        if (el.checked) payload[name] = el.value;
                    } else if (el.value) {
                        payload[name] = el.value;
                    }
                });

                const result = await savedApiService.execute(props.savedApiId, payload);

                if (result.success) {
                    setSubmitted(true);
                    // Reset form using the stored reference
                    form.reset();
                    setTimeout(() => setSubmitted(false), 3000);
                } else {
                    setError(result.msg || "Submission failed");
                }
            } catch (err: any) {
                setError(err.message || "Request failed");
            } finally {
                setSubmitting(false);
            }
        };

        return (
            <form
                onSubmit={handleSubmit}
                style={{
                    width: props.width !== "auto" ? props.width : undefined,
                    height: props.height !== "auto" ? props.height : undefined,
                    backgroundColor,
                    padding,
                    borderRadius: props.borderRadius ?? "8px",
                    border: "1px solid #e2e8f0",
                    margin: props.margin ?? "0px",
                    position: "relative",
                }}
            >
                <Children />

                {/* Status indicators */}
                {submitting && (
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: "rgba(255,255,255,0.8)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: props.borderRadius ?? "8px",
                            fontSize: "14px",
                            color: "#3b82f6",
                            fontWeight: 500,
                        }}
                    >
                        Submitting...
                    </div>
                )}

                {submitted && (
                    <div
                        style={{
                            marginTop: "12px",
                            padding: "10px 16px",
                            background: "#f0fdf4",
                            border: "1px solid #bbf7d0",
                            borderRadius: "6px",
                            color: "#15803d",
                            fontSize: "14px",
                        }}
                    >
                        ✓ {props.successMessage || "Submitted successfully!"}
                    </div>
                )}

                {error && (
                    <div
                        style={{
                            marginTop: "12px",
                            padding: "10px 16px",
                            background: "#fef2f2",
                            border: "1px solid #fecaca",
                            borderRadius: "6px",
                            color: "#dc2626",
                            fontSize: "14px",
                        }}
                    >
                        ✗ {error}
                    </div>
                )}
            </form>
        );
    },
};
