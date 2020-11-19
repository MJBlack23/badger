import * as React from 'react'

interface Props {
  children: JSX.Element
  label: string
}

export default (props: Props) => (
  <div
    style={styles.container}
    className="container"
  >
    <h3>{props.label}</h3>
    <hr />
    {props.children}
  </div>
)

const styles = {
  container: {
    backgroundColor: '#FFF',
    border: '1px solid #4D4D4D',
    paddingTop: 10,
    paddingBottom: 15
  }
}