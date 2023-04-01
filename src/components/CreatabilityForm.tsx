type FormProps = {
  lineItems: string
}

const CreatabilityForm = (props: FormProps) => {
  return (
    <div style={{
      height: '100%',
      width: '100%'
    }}>
        <iframe
            src={`https://link.creatability.com/widget/form/4AOtxQcaT0o6Enkzgi3Z?calculator_results=${encodeURIComponent(props.lineItems)}`}
            style={{
                'width': '100%',
                'height': '100%',
                'border': 'none',
                'borderRadius': '4px',
            }}
            id="inline-4AOtxQcaT0o6Enkzgi3Z"
            data-layout="{'id':'INLINE'}"
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            title="Upcyclit Calculator Results"
            data-form-name="Upcyclit Calculator Results"
            data-height="761"
            data-layout-iframe-id="inline-4AOtxQcaT0o6Enkzgi3Z"
            data-form-id="4AOtxQcaT0o6Enkzgi3Z"
        ></iframe>
        <script src="https://link.creatability.com/js/form_embed.js"></script>
    </div>
  )
}

export default CreatabilityForm