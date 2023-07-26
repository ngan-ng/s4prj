import '/backend/api_requests/api_calls.dart';
import '/components/booking/seat/seat_widget.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/flutter_flow_widgets.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'seatmap_model.dart';
export 'seatmap_model.dart';

class SeatmapWidget extends StatefulWidget {
  const SeatmapWidget({
    Key? key,
    required this.seatmap,
    required this.passengers,
  }) : super(key: key);

  final List<dynamic>? seatmap;
  final List<dynamic>? passengers;

  @override
  _SeatmapWidgetState createState() => _SeatmapWidgetState();
}

class _SeatmapWidgetState extends State<SeatmapWidget> {
  late SeatmapModel _model;

  @override
  void setState(VoidCallback callback) {
    super.setState(callback);
    _model.onUpdate();
  }

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => SeatmapModel());
  }

  @override
  void dispose() {
    _model.maybeDispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    context.watch<FFAppState>();

    return Container(
      width: 300.0,
      height: double.infinity,
      constraints: BoxConstraints(
        maxHeight: 450.0,
      ),
      decoration: BoxDecoration(
        color: FlutterFlowTheme.of(context).secondaryBackground,
      ),
      child: Column(
        mainAxisSize: MainAxisSize.max,
        children: [
          Padding(
            padding: EdgeInsetsDirectional.fromSTEB(30.0, 0.0, 0.0, 5.0),
            child: Builder(
              builder: (context) {
                final passengers = widget.passengers!.map((e) => e).toList();
                return SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: Row(
                    mainAxisSize: MainAxisSize.max,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children:
                        List.generate(passengers.length, (passengersIndex) {
                      final passengersItem = passengers[passengersIndex];
                      return Align(
                        alignment: AlignmentDirectional(0.0, 0.0),
                        child: FFButtonWidget(
                          onPressed: () async {
                            setState(() {
                              _model.managingPax = getJsonField(
                                passengersItem,
                                r'''$.id''',
                              );
                            });
                          },
                          text: getJsonField(
                            passengersItem,
                            r'''$.firstName''',
                          ).toString(),
                          options: FFButtonOptions(
                            width: 90.0,
                            height: 40.0,
                            padding: EdgeInsetsDirectional.fromSTEB(
                                0.0, 0.0, 0.0, 0.0),
                            iconPadding: EdgeInsetsDirectional.fromSTEB(
                                0.0, 0.0, 0.0, 0.0),
                            color: Color(0xD34B39EF),
                            textStyle: FlutterFlowTheme.of(context)
                                .titleSmall
                                .override(
                                  fontFamily: 'Readex Pro',
                                  color: Colors.white,
                                  fontWeight: FontWeight.w300,
                                ),
                            elevation: 3.0,
                            borderSide: BorderSide(
                              color: Colors.transparent,
                              width: 1.0,
                            ),
                            borderRadius: BorderRadius.circular(8.0),
                          ),
                        ),
                      );
                    }),
                  ),
                );
              },
            ),
          ),
          Row(
            mainAxisSize: MainAxisSize.max,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                width: 44.0,
                height: 44.0,
                decoration: BoxDecoration(
                  color: FlutterFlowTheme.of(context).secondaryBackground,
                ),
                child: Align(
                  alignment: AlignmentDirectional(0.0, 0.0),
                  child: Text(
                    'A',
                    style: FlutterFlowTheme.of(context).bodyMedium,
                  ),
                ),
              ),
              Container(
                width: 44.0,
                height: 44.0,
                decoration: BoxDecoration(
                  color: FlutterFlowTheme.of(context).secondaryBackground,
                ),
                child: Align(
                  alignment: AlignmentDirectional(0.0, 0.0),
                  child: Text(
                    'B',
                    style: FlutterFlowTheme.of(context).bodyMedium,
                  ),
                ),
              ),
              Container(
                width: 44.0,
                height: 44.0,
                decoration: BoxDecoration(
                  color: FlutterFlowTheme.of(context).secondaryBackground,
                ),
                child: Align(
                  alignment: AlignmentDirectional(0.0, 0.0),
                  child: Text(
                    'C',
                    style: FlutterFlowTheme.of(context).bodyMedium,
                  ),
                ),
              ),
              Container(
                width: 44.0,
                height: 44.0,
                decoration: BoxDecoration(
                  color: FlutterFlowTheme.of(context).secondaryBackground,
                ),
                child: Align(
                  alignment: AlignmentDirectional(0.0, 0.0),
                  child: Text(
                    'D',
                    style: FlutterFlowTheme.of(context).bodyMedium,
                  ),
                ),
              ),
              Container(
                width: 44.0,
                height: 44.0,
                decoration: BoxDecoration(
                  color: FlutterFlowTheme.of(context).secondaryBackground,
                ),
                child: Align(
                  alignment: AlignmentDirectional(0.0, 0.0),
                  child: Text(
                    'E',
                    style: FlutterFlowTheme.of(context).bodyMedium,
                  ),
                ),
              ),
              Container(
                width: 44.0,
                height: 44.0,
                decoration: BoxDecoration(
                  color: FlutterFlowTheme.of(context).secondaryBackground,
                ),
                child: Align(
                  alignment: AlignmentDirectional(0.0, 0.0),
                  child: Text(
                    'F',
                    style: FlutterFlowTheme.of(context).bodyMedium,
                  ),
                ),
              ),
            ],
          ),
          Expanded(
            child: Builder(
              builder: (context) {
                final seats = widget.seatmap!.toList();
                return GridView.builder(
                  padding: EdgeInsets.zero,
                  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 6,
                    crossAxisSpacing: 5.0,
                    mainAxisSpacing: 8.0,
                    childAspectRatio: 1.0,
                  ),
                  scrollDirection: Axis.vertical,
                  itemCount: seats.length,
                  itemBuilder: (context, seatsIndex) {
                    final seatsItem = seats[seatsIndex];
                    return Padding(
                      padding:
                          EdgeInsetsDirectional.fromSTEB(5.0, 5.0, 5.0, 5.0),
                      child: Container(
                        width: 44.0,
                        height: 44.0,
                        constraints: BoxConstraints(
                          maxWidth: 48.0,
                          maxHeight: 48.0,
                        ),
                        decoration: BoxDecoration(
                          color:
                              FlutterFlowTheme.of(context).secondaryBackground,
                        ),
                        child: InkWell(
                          splashColor: Colors.transparent,
                          focusColor: Colors.transparent,
                          hoverColor: Colors.transparent,
                          highlightColor: Colors.transparent,
                          onTap: () async {
                            var _shouldSetState = false;
                            _model.handSeatResult = await HandleSeatCall.call(
                              id: getJsonField(
                                seatsItem,
                                r'''$.id''',
                              ),
                              bookingId: _model.managingPax,
                              action: 'select',
                            );
                            _shouldSetState = true;
                            if ((_model.handSeatResult?.succeeded ?? true)) {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text(
                                    'Success',
                                    style: TextStyle(
                                      color: FlutterFlowTheme.of(context)
                                          .primaryBackground,
                                    ),
                                  ),
                                  duration: Duration(milliseconds: 4000),
                                  backgroundColor:
                                      FlutterFlowTheme.of(context).secondary,
                                ),
                              );
                            } else {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text(
                                    'Error',
                                    style: TextStyle(
                                      color: FlutterFlowTheme.of(context)
                                          .primaryBackground,
                                    ),
                                  ),
                                  duration: Duration(milliseconds: 4000),
                                  backgroundColor:
                                      FlutterFlowTheme.of(context).error,
                                ),
                              );
                              if (_shouldSetState) setState(() {});
                              return;
                            }

                            if (_shouldSetState) setState(() {});
                          },
                          child: wrapWithModel(
                            model: _model.seatModels.getModel(
                              getJsonField(
                                seatsItem,
                                r'''$.id''',
                              ).toString(),
                              seatsIndex,
                            ),
                            updateCallback: () => setState(() {}),
                            updateOnChange: true,
                            child: SeatWidget(
                              key: Key(
                                'Keykyg_${getJsonField(
                                  seatsItem,
                                  r'''$.id''',
                                ).toString()}',
                              ),
                              seat: getJsonField(
                                seatsItem,
                                r'''$''',
                              ),
                            ),
                          ),
                        ),
                      ),
                    );
                  },
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
